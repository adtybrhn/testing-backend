const httpMocks = require("node-mocks-http");

const { getById, remove } = require("../merchants");

const mockFindOneMerchant = jest.fn();
jest.mock("../../../storage", () => {
 return {
   models: {
     merchant: {
       findOne: () => mockFindOneMerchant(),
       destroy: () => mockFindOneMerchant(),
     },
   },
 };
});

// Get By ID
test("getById returns an existing merchant", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/merchants/1",
      params: {
        id: 42,
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneMerchant.mockResolvedValue({
      id: "1",
      name: "Warteg Kharisma Bahari",
    });
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
      id: "1",
      name: "Warteg Kharisma Bahari",
    });
   });

   // 404 - Not Found
   test("getById returns 404 when a merchant id does not exists", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/merchants/2",
      params: {
        id: 2,
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneMerchant.mockResolvedValue(null);
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getData()).toEqual("404 - Not found");
   });

   // Delete
   test("Delete existing merchant", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/merchants/:id",
      params:{
        id:1
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneMerchant.mockResolvedValue({
        id: 1
    });
   
    await remove(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({ "message": "Merchant has been Deleted" });
   });




