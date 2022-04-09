import { Module } from "@nestjs/common";
import { VendorModuleBase } from "./base/vendor.module.base";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";
import { VendorResolver } from "./vendor.resolver";

@Module({
  imports: [VendorModuleBase],
  controllers: [VendorController],
  providers: [VendorService, VendorResolver],
  exports: [VendorService],
})
export class VendorModule {}
