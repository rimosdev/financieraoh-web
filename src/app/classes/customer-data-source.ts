import { FsService } from "../services/fs.service";
import { DataSource } from "@angular/cdk/collections";

export class CustomerDataSource extends DataSource<any> {
    
  constructor(private fs: FsService) {
    super()
  }

  connect() {
    return this.fs.getCustomers();
  }

  disconnect() {

  }
}
