import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { ProductController } from "../product.controller";
import { ProductService } from "../product.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  description: "exampleDescription",
  code: "exampleCode",
  externalCode: "exampleExternalCode",
  archived: "true",
  pathName: "examplePathName",
  vatEnabled: "true",
  useParentVat: "true",
  minPrice: 42.42,
  buyPrice: 42.42,
  article: "exampleArticle",
  weight: 42.42,
  volume: 42.42,
  start: new Date(),
  end: new Date(),
  day: "exampleDay",
  price: 42.42,
  accountId: "exampleAccountId",
  shared: "true",
  updated: new Date(),
  name: "exampleName",
  effectiveVat: 42,
  effectiveVatEnabled: "true",
  vat: 42,
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  description: "exampleDescription",
  code: "exampleCode",
  externalCode: "exampleExternalCode",
  archived: "true",
  pathName: "examplePathName",
  vatEnabled: "true",
  useParentVat: "true",
  minPrice: 42.42,
  buyPrice: 42.42,
  article: "exampleArticle",
  weight: 42.42,
  volume: 42.42,
  start: new Date(),
  end: new Date(),
  day: "exampleDay",
  price: 42.42,
  accountId: "exampleAccountId",
  shared: "true",
  updated: new Date(),
  name: "exampleName",
  effectiveVat: 42,
  effectiveVatEnabled: "true",
  vat: 42,
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "exampleDescription",
    code: "exampleCode",
    externalCode: "exampleExternalCode",
    archived: "true",
    pathName: "examplePathName",
    vatEnabled: "true",
    useParentVat: "true",
    minPrice: 42.42,
    buyPrice: 42.42,
    article: "exampleArticle",
    weight: 42.42,
    volume: 42.42,
    start: new Date(),
    end: new Date(),
    day: "exampleDay",
    price: 42.42,
    accountId: "exampleAccountId",
    shared: "true",
    updated: new Date(),
    name: "exampleName",
    effectiveVat: 42,
    effectiveVatEnabled: "true",
    vat: 42,
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  description: "exampleDescription",
  code: "exampleCode",
  externalCode: "exampleExternalCode",
  archived: "true",
  pathName: "examplePathName",
  vatEnabled: "true",
  useParentVat: "true",
  minPrice: 42.42,
  buyPrice: 42.42,
  article: "exampleArticle",
  weight: 42.42,
  volume: 42.42,
  start: new Date(),
  end: new Date(),
  day: "exampleDay",
  price: 42.42,
  accountId: "exampleAccountId",
  shared: "true",
  updated: new Date(),
  name: "exampleName",
  effectiveVat: 42,
  effectiveVatEnabled: "true",
  vat: 42,
};

const service = {
  createProduct() {
    return CREATE_RESULT;
  },
  products: () => FIND_MANY_RESULT,
  product: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Product", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: service,
        },
      ],
      controllers: [ProductController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /products", async () => {
    await request(app.getHttpServer())
      .post("/products")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        start: CREATE_RESULT.start.toISOString(),
        end: CREATE_RESULT.end.toISOString(),
        updated: CREATE_RESULT.updated.toISOString(),
      });
  });

  test("GET /products", async () => {
    await request(app.getHttpServer())
      .get("/products")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          start: FIND_MANY_RESULT[0].start.toISOString(),
          end: FIND_MANY_RESULT[0].end.toISOString(),
          updated: FIND_MANY_RESULT[0].updated.toISOString(),
        },
      ]);
  });

  test("GET /products/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/products"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /products/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/products"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        start: FIND_ONE_RESULT.start.toISOString(),
        end: FIND_ONE_RESULT.end.toISOString(),
        updated: FIND_ONE_RESULT.updated.toISOString(),
      });
  });

  test("POST /products existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/products")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        start: CREATE_RESULT.start.toISOString(),
        end: CREATE_RESULT.end.toISOString(),
        updated: CREATE_RESULT.updated.toISOString(),
      })
      .then(function () {
        agent
          .post("/products")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
