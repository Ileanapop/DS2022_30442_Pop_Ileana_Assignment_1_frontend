/**
 * @fileoverview gRPC-Web generated client stub for chatManagement
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.15.8
// source: src/chat.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.chatManagement = require('./chat_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.chatManagement.ChatServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.chatManagement.ChatServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chatManagement.User,
 *   !proto.chatManagement.JoinResponse>}
 */
const methodDescriptor_ChatService_JoinChat = new grpc.web.MethodDescriptor(
  '/chatManagement.ChatService/JoinChat',
  grpc.web.MethodType.UNARY,
  proto.chatManagement.User,
  proto.chatManagement.JoinResponse,
  /**
   * @param {!proto.chatManagement.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chatManagement.JoinResponse.deserializeBinary
);


/**
 * @param {!proto.chatManagement.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.chatManagement.JoinResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chatManagement.JoinResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chatManagement.ChatServiceClient.prototype.joinChat =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chatManagement.ChatService/JoinChat',
      request,
      metadata || {},
      methodDescriptor_ChatService_JoinChat,
      callback);
};


/**
 * @param {!proto.chatManagement.User} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chatManagement.JoinResponse>}
 *     Promise that resolves to the response
 */
proto.chatManagement.ChatServicePromiseClient.prototype.joinChat =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chatManagement.ChatService/JoinChat',
      request,
      metadata || {},
      methodDescriptor_ChatService_JoinChat);
};


module.exports = proto.chatManagement;
