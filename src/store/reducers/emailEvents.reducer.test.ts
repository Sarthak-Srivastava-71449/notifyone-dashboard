import {
  fetchEmailEventFailure,
  fetchEmailEventRequest,
  fetchEmailEventsFailure,
  fetchEmailEventsRequest,
  fetchEmailEventsSuccess,
  fetchEmailEventSuccess,
  previewEmailEventsFailure,
  previewEmailEventsRequest,
  previewEmailEventsSuccess,
  previewEmailTemplateFailure,
  previewEmailTemplateRequest,
  previewEmailTemplateSuccess,
  updateEmailEventsFailure,
  updateEmailEventsRequest,
  updateEmailEventsSuccess,
} from '../actions/emailEvents';
import emailEventsReducer from './emailEvents.reducer';

describe('Email Events Reducer Test Suite', () => {
  const initialState: IEmailEventState = {
    loading: false,
    error: '',
    email_templates: [],
    included_templates: [],
    email_previews: [],
    included_previews: [],
    loadingPreview: false,
    success: false,
  };

  test('should return the initial state', () => {
    expect(emailEventsReducer(undefined, {})).toEqual(initialState);
  });

  test('should change loading when fetching all templates', () => {
    expect(emailEventsReducer(initialState, fetchEmailEventsRequest())).toEqual(
      {
        ...initialState,
        loading: true,
      }
    );
  });

  test('should change loading when fetching included template', () => {
    expect(emailEventsReducer(initialState, fetchEmailEventRequest())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  test('should return same state when making a preview template request', () => {
    expect(
      emailEventsReducer(initialState, previewEmailTemplateRequest())
    ).toEqual(initialState);
  });

  test('should return same state when starting a update template request', () => {
    expect(
      emailEventsReducer(initialState, updateEmailEventsRequest())
    ).toEqual(initialState);
  });

  test('should change loadingPreview when starting a preview template request', () => {
    expect(
      emailEventsReducer(initialState, previewEmailEventsRequest())
    ).toEqual({
      ...initialState,
      loadingPreview: true,
    });
  });

  test('should populate email_templates when fetch request for all templates is successful', () => {
    const randomData = [
      {
        description: 'description',
        subject: null,
        app_name: 'inventory_feeder',
        name: 'easysol_api_not_working',
        event_id: 30,
        triggers_limit: -1,
        id: 17,
        actions: 0,
        updated_by: 'up',
        event_name: 'easysol_api_not_working',
        includes: [],
        content:
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"\n        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n    <title>EasySol SKU update API not working</title>\n</head>\n<body yahoo style="width: 100%; margin: 0; padding: 0;">\n<table width="100%" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; overflow: hidden;">\n    <tr style="width: 100%;">\n        <td>\n            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"\n                   style="table-layout: fixed; overflow: hidden; border-collapse: collapse; background-color: #28617C; max-width: 600px">\n                <tr style="width: 100%">\n                    <td align="center" style="padding: 40px 0 30px 0;">\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; overflow: hidden;">\n                            <tr style="width: 100%">\n                                <td align="center" style=""><a\n                                        href="https://www.1mg.com/?utm_source=emailer&utm_medium=signup-mail&utm_campaign=features"><img\n                                        width="80" src="{{base_url}}/images/emails/logo-1mg.jpg" alt="1mg"/></a></td>\n                            </tr>\n                            <tr style="width: 100%">\n                                <td align="center"\n                                    style="padding-top: 25px; margin-bottom: 0; font-size: 22px; color: yellow; font-family: sans-serif;">\n                                    EasySol SKU update API did not run in the last {{interval_in_minutes}} minutes\n                                </td>\n                            </tr>\n                        </table>\n                    </td>\n                </tr>\n            </table>\n        </td>\n    </tr>\n</table>\n</body>\n</html>',
      },
      {
        description: null,
        subject: null,
        app_name: 'ecom',
        name: 'contact_vendor',
        event_id: 170,
        triggers_limit: -1,
        id: 162,
        actions: 1,
        updated_by: 'rohit.taneja@1mg.com',
        event_name: 'contact_vendor',
        includes: [],
        content:
          '<br>Vendor ID : {{vendor_id}}<br>SKU ID : {{sku_id}}<br>vendor name : {{vendor_name}}<br>User Email : {{email}}<br>Query : {{query}} <br>',
      },
    ];
    expect(
      emailEventsReducer(initialState, fetchEmailEventsSuccess(randomData))
    ).toEqual({
      ...initialState,
      email_templates: randomData,
    });
  });

  test('should populate included_templates when fetch request for a single template is successful', () => {
    const randomData = [
      {
        description: 'description',
        includes: [],
        subject: null,
        updated_by: 'up',
        name: 'cashback_not_credited',
        event_id: null,
        content:
          'if order.payment_summary.cashback_earned\n    .card\n        .card-content.subtle\n            .section-title\n                .row\n                    .left-col 1mgCash\n                        sup *\n            span Eligible 1mgCash of Rs. {{\'%0.2f\' % order.payment_summary.cashback_earned}} will not be credited because\n            | <span> </span>\n            {% if order.original_status|lower == "cancelled" %}\n            | the order has been cancelled.\n            {% elif order.original_status|lower == "out for return and refund" or order.original_status|lower == "request for return and refund" %}\n            | a return request has been initiated for this order.\n            {% elif order.original_status|lower == "returned and refunded" %}\n            | the order has been returned.\n            {% else %}\n            | the order has been cancelled.\n            {% endif %}',
        id: 19,
      },
    ];
    expect(
      emailEventsReducer(initialState, fetchEmailEventSuccess(randomData))
    ).toEqual({
      ...initialState,
      included_templates: randomData,
    });
  });

  test('should populate email_previews when fetch request for a preview is successful', () => {
    const randomData = {
      subject: 'Order Cancelled: Your 1mg Order PO10222267130337',
      content: '<html>ing:8px; padding-top:html>\n',
    };
    expect(
      emailEventsReducer(initialState, previewEmailEventsSuccess(randomData))
    ).toEqual({
      ...initialState,
      email_previews: randomData,
    });
  });

  test('should populate included_previews when fetch request for a included template preview is successful', () => {
    const randomData = {
      subject: 'Order Cancelled: Your 1mg Order PO10222267130337',
      content: '<html>ing:8px; padding-top:html>\n',
    };
    expect(
      emailEventsReducer(initialState, previewEmailTemplateSuccess(randomData))
    ).toEqual({
      ...initialState,
      included_previews: randomData,
    });
  });

  test('should test for error while fetching all email templates', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      emailEventsReducer(initialState, fetchEmailEventsFailure(randomError))
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should test for error while fetching included templates', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      emailEventsReducer(initialState, fetchEmailEventFailure(randomError))
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should test for error while fetching preview for included template', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      emailEventsReducer(initialState, previewEmailTemplateFailure(randomError))
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should test for error while fetching preview for template', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      emailEventsReducer(initialState, previewEmailEventsFailure(randomError))
    ).toEqual({
      ...initialState,
      loading: false,
      loadingPreview: false,
      error: randomError,
    });
  });

  test('should test for error while updating template', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      emailEventsReducer(initialState, updateEmailEventsFailure(randomError))
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should return boolean value if a update request is successful', () => {
    const success = true;
    expect(
      emailEventsReducer(initialState, updateEmailEventsSuccess(success))
    ).toEqual({
      ...initialState,
      success: true,
    });
  });
});
