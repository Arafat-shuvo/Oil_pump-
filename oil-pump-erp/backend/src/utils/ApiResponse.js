export class ApiResponse {
  constructor(data, message = "OK") {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
