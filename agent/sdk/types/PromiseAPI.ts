import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, PromiseConfigurationOptions, wrapOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

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
import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Health Check
     */
    public healthCheckHealthGetWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<{ [key: string]: string; }>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.healthCheckHealthGetWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Health Check
     */
    public healthCheckHealthGet(_options?: PromiseConfigurationOptions): Promise<{ [key: string]: string; }> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.healthCheckHealthGet(observableOptions);
        return result.toPromise();
    }

    /**
     * Invocations Endpoint
     * @param responsesAgentRequest
     */
    public invocationsEndpointInvocationsPostWithHttpInfo(responsesAgentRequest: ResponsesAgentRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ResponsesAgentResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.invocationsEndpointInvocationsPostWithHttpInfo(responsesAgentRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Invocations Endpoint
     * @param responsesAgentRequest
     */
    public invocationsEndpointInvocationsPost(responsesAgentRequest: ResponsesAgentRequest, _options?: PromiseConfigurationOptions): Promise<ResponsesAgentResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.invocationsEndpointInvocationsPost(responsesAgentRequest, observableOptions);
        return result.toPromise();
    }


}



