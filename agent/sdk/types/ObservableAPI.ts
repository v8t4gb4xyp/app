import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class ObservableDefaultApi {
    private requestFactory: DefaultApiRequestFactory;
    private responseProcessor: DefaultApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DefaultApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DefaultApiResponseProcessor();
    }

    /**
     * Health Check
     */
    public healthCheckHealthGetWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<{ [key: string]: string; }>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.healthCheckHealthGet(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.healthCheckHealthGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Health Check
     */
    public healthCheckHealthGet(_options?: ConfigurationOptions): Observable<{ [key: string]: string; }> {
        return this.healthCheckHealthGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<{ [key: string]: string; }>) => apiResponse.data));
    }

    /**
     * Invocations Endpoint
     * @param responsesAgentRequest
     */
    public invocationsEndpointInvocationsPostWithHttpInfo(responsesAgentRequest: ResponsesAgentRequest, _options?: ConfigurationOptions): Observable<HttpInfo<ResponsesAgentResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.invocationsEndpointInvocationsPost(responsesAgentRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.invocationsEndpointInvocationsPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Invocations Endpoint
     * @param responsesAgentRequest
     */
    public invocationsEndpointInvocationsPost(responsesAgentRequest: ResponsesAgentRequest, _options?: ConfigurationOptions): Observable<ResponsesAgentResponse> {
        return this.invocationsEndpointInvocationsPostWithHttpInfo(responsesAgentRequest, _options).pipe(map((apiResponse: HttpInfo<ResponsesAgentResponse>) => apiResponse.data));
    }

}
