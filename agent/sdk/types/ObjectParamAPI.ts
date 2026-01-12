import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { ChatContext } from '../models/ChatContext';
import { Content } from '../models/Content';
import { ContentAnyOfInner } from '../models/ContentAnyOfInner';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { IncompleteDetails } from '../models/IncompleteDetails';
import { InputTokensDetails } from '../models/InputTokensDetails';
import { Message } from '../models/Message';
import { OutputItem } from '../models/OutputItem';
import { OutputTokensDetails } from '../models/OutputTokensDetails';
import { ReasoningParams } from '../models/ReasoningParams';
import { ResponseError } from '../models/ResponseError';
import { ResponseInputTextParam } from '../models/ResponseInputTextParam';
import { ResponseUsage } from '../models/ResponseUsage';
import { ResponsesAgentRequest } from '../models/ResponsesAgentRequest';
import { ResponsesAgentRequestInputInner } from '../models/ResponsesAgentRequestInputInner';
import { ResponsesAgentResponse } from '../models/ResponsesAgentResponse';
import { Tool } from '../models/Tool';
import { ToolChoice } from '../models/ToolChoice';
import { ToolChoiceFunction } from '../models/ToolChoiceFunction';
import { ValidationError } from '../models/ValidationError';
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiHealthCheckHealthGetRequest {
}

export interface DefaultApiInvocationsEndpointInvocationsPostRequest {
    /**
     * 
     * @type ResponsesAgentRequest
     * @memberof DefaultApiinvocationsEndpointInvocationsPost
     */
    responsesAgentRequest: ResponsesAgentRequest
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Health Check
     * @param param the request object
     */
    public healthCheckHealthGetWithHttpInfo(param: DefaultApiHealthCheckHealthGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<{ [key: string]: string; }>> {
        return this.api.healthCheckHealthGetWithHttpInfo( options).toPromise();
    }

    /**
     * Health Check
     * @param param the request object
     */
    public healthCheckHealthGet(param: DefaultApiHealthCheckHealthGetRequest = {}, options?: ConfigurationOptions): Promise<{ [key: string]: string; }> {
        return this.api.healthCheckHealthGet( options).toPromise();
    }

    /**
     * Invocations Endpoint
     * @param param the request object
     */
    public invocationsEndpointInvocationsPostWithHttpInfo(param: DefaultApiInvocationsEndpointInvocationsPostRequest, options?: ConfigurationOptions): Promise<HttpInfo<ResponsesAgentResponse>> {
        return this.api.invocationsEndpointInvocationsPostWithHttpInfo(param.responsesAgentRequest,  options).toPromise();
    }

    /**
     * Invocations Endpoint
     * @param param the request object
     */
    public invocationsEndpointInvocationsPost(param: DefaultApiInvocationsEndpointInvocationsPostRequest, options?: ConfigurationOptions): Promise<ResponsesAgentResponse> {
        return this.api.invocationsEndpointInvocationsPost(param.responsesAgentRequest,  options).toPromise();
    }

}
