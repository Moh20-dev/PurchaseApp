import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { VendorResolverBase } from "./base/vendor.resolver.base";
import { Vendor } from "./base/Vendor";
import { VendorService } from "./vendor.service";

@graphql.Resolver(() => Vendor)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class VendorResolver extends VendorResolverBase {
  constructor(
    protected readonly service: VendorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
