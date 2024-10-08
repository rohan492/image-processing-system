# API Documentation

## Main Application API

Base URL: http://localhost:3000

### Upload CSV

Uploads a CSV file containing image URLs for processing.

- URL: /api/upload
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - csv: CSV file

Response:

```
    {
        "requestId": "string"
    }
```

- Status Code: 202 Accepted

### Check Status

Retrieves the status of a processing request.

- URL: /api/status/:requestId
- Method: GET
- URL Params:
  - requestId: The ID of the request returned from the upload API

Response:

```
    {
        "requestId": "string",
        "status": "string",
        "progress": "number",
        "createdAt": "date",
        "updatedAt": "date"
    }
```

- Status Code: 200 OK

### Webhook Receiver API

Base URL: http://localhost:3001

Receive Webhook
Receives webhook notifications about completed processing requests.

- URL: /webhook
- Method: POST
- Content-Type: application/json
- Body:
  {
  "requestId": "string",
  "status": "string",
  "outputCsvUrl": "string",
  "timestamp": "string"
  }

Response:

- Status Code: 200 OK
- Body: "Webhook received successfully"

### Error Responses

In case of errors, the API will return appropriate HTTP status codes along with a JSON response containing an error message:

```
{
    "error": "Error message description"
}
```

Common error status codes:

- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error

For more detailed information about the API implementation, please refer to the source code in the respective directories.
