const httpMocks = require("node-mocks-http");
const { getById, remove, update } = require("../products");

const mockFindOneProduct = jest.fn();
jest.mock("../../../storage", () => {
 return {
   models: {
     product: {
       findOne: () => mockFindOneProduct(),
       destroy: () => mockFindOneProduct(),
     },
   },
 };
});

// Get By ID
test("getById returns an existing merchant", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/products/1",
      params: {
        id: 42, 
      },
    });

    const response = httpMocks.createResponse();
    mockFindOneProduct.mockResolvedValue({
      id: "1",
      name: "iPhone 15",
    });
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
      id: "1",
      name: "iPhone 15",
    });
   });

   // 404 - Not Found
   test("getById returns 404 when a merchant id does not exists", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/products/2",
      params: {
        id: 2,      
      },
    });

    const response = httpMocks.createResponse();
    mockFindOneProduct.mockResolvedValue(null);
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getData()).toEqual("404 - Not found");
   });

   // Delete
   test("Delete existing merchant", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/products/:id",
      params:{
        id:1
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue({
        id: 1
    });
   
    await remove(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({ "message": "Product has been Deleted" });
   });




