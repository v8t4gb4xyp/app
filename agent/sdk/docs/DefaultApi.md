# .DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**healthCheckHealthGet**](DefaultApi.md#healthCheckHealthGet) | **GET** /health | Health Check
[**invocationsEndpointInvocationsPost**](DefaultApi.md#invocationsEndpointInvocationsPost) | **POST** /invocations | Invocations Endpoint


# **healthCheckHealthGet**
> { [key: string]: string; } healthCheckHealthGet()


### Example


```typescript
import { createConfiguration, DefaultApi } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request = {};

const data = await apiInstance.healthCheckHealthGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **invocationsEndpointInvocationsPost**
> ResponsesAgentResponse invocationsEndpointInvocationsPost(responsesAgentRequest)


### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiInvocationsEndpointInvocationsPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiInvocationsEndpointInvocationsPostRequest = {
  
  responsesAgentRequest: {
    toolChoice: null,
    truncation: "truncation_example",
    maxOutputTokens: 1,
    metadata: {
      "key": "key_example",
    },
    parallelToolCalls: true,
    tools: [
      ,
    ],
    reasoning: {
      effort: "effort_example",
      generateSummary: "generateSummary_example",
    },
    store: true,
    stream: true,
    temperature: 3.14,
    text: null,
    topP: 3.14,
    user: "user_example",
    input: [
      null,
    ],
    customInputs: {},
    context: {
      conversationId: "conversationId_example",
      userId: "userId_example",
    },
  },
};

const data = await apiInstance.invocationsEndpointInvocationsPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **responsesAgentRequest** | **ResponsesAgentRequest**|  |


### Return type

**ResponsesAgentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


