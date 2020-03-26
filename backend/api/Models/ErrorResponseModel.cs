using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Pims.Core.Extensions;

namespace Pims.Api.Models
{
    /// <summary>
    /// ErrorResponseModel class, provides a standardized error message for unhandled exceptions.
    /// </summary>
    public class ErrorResponseModel
    {
        #region Properties
        /// <summary>
        /// get/set - The error message.
        /// </summary>
        /// <value></value>
        public string Error { get; set; }

        /// <summary>
        /// get/set - The exception type that threw thew exception.
        /// </summary>
        /// <value></value>
        public string Type { get; set; }

        /// <summary>
        /// get/set - The details of the error (all the inner exceptions.)
        /// </summary>
        /// <value></value>
        public string Details { get; set; }

        /// <summary>
        /// get/set - The stack trace.
        /// </summary>
        /// <value></value>
        public string StackTrace { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Creates a new instance of an ErrorResponseModel object.
        /// </summary>
        public ErrorResponseModel() { }

        /// <summary>
        /// Creates a new instance of an ErrorResponseModel object, initializes with specified arguments.
        /// </summary>
        /// <param name="environment"></param>
        /// <param name="ex"></param>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public ErrorResponseModel(IWebHostEnvironment environment, Exception ex, string message, string details)
        {
            var isDev = environment.IsDevelopment();
            this.Error = isDev ? ex.Message : message;
            this.Type = ex.GetType().Name;
            this.Details = isDev ? details ?? ex.GetAllMessages() : null;
            this.StackTrace = isDev ? ex.StackTrace : null;
        }

        /// <summary>
        /// Creates a new instance of an ErrorResponseModel object, initializes with specified arguments.
        /// </summary>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public ErrorResponseModel(string message, string details)
        {
            this.Error = message;
            this.Details = details;
        }
        #endregion
    }
}