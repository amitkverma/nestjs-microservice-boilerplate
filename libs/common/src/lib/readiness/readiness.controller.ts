import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { ApplicationReadiness } from "./readiness.model";

@Controller("status/readiness")
export class ReadinessController {
  @Get()
  public async check(): Promise<boolean> {
    console.log("is ready", ApplicationReadiness.getInstance().isReady)
    if (!ApplicationReadiness.getInstance().isReady) {
      throw new ServiceUnavailableException(false);
    }
    return ApplicationReadiness.getInstance().isReady;
  }
}