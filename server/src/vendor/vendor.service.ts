import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { VendorServiceBase } from "./base/vendor.service.base";

@Injectable()
export class VendorService extends VendorServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
