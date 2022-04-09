import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { InvoiceController } from "../invoice.controller";
import { InvoiceService } from "../invoice.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  actualDate: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  vendorId: 42,
};
const CREATE_RESULT = {
  actualDate: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  vendorId: 42,
};
const FIND_MANY_RESULT = [
  {
    actualDate: new Date(),
    createdAt: new Date(),
    id: "exampleId",
    updatedAt: new Date(),
    vendorId: 42,
  },
];
const FIND_ONE_RESULT = {
  actualDate: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  vendorId: 42,
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
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

describe("Invoice", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: InvoiceService,
          useValue: service,
        },
      ],
      controllers: [InvoiceController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /invoices", async () => {
    await request(app.getHttpServer())
      .post("/invoices")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        actualDate: CREATE_RESULT.actualDate.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /invoices", async () => {
    await request(app.getHttpServer())
      .get("/invoices")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          actualDate: FIND_MANY_RESULT[0].actualDate.toISOString(),
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /invoices/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/invoices"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /invoices/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/invoices"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        actualDate: FIND_ONE_RESULT.actualDate.toISOString(),
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
