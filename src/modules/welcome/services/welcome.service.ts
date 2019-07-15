import { BaseService } from "../../commom/services/base.service";
import { Welcome, WelcomeModel} from "../models/welcome.model";

export class WelcomeService extends BaseService<Welcome>{
  constructor(){
    super(WelcomeModel);
  }
}
