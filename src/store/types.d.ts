/*
SMS Event Types
*/

type MSMSTemplate = {
  event_text?: string;
  actions?: number;
  event_name?: string;
  app_name?: string;
  triggers_limit?: number;
  id?: number;
};

interface ISMSEventState {
  loading: boolean;
  error: string;
  total_count: number;
  sms_templates: MSMSTemplate[];
  success: boolean;
}

type SMSEventAction = {
  type?: string;
  payload?: any;
};

type SMSEventDispatchType = (args: SMSEventAction) => SMSEventAction | any;

/*
Push Notification Event Types
*/

type MPushEventTemplate = {
  updated?: number;
  body?: string;
  actions?: number;
  image?: any;
  updated_by?: string;
  event_name?: string;
  app_name?: string;
  target?: string;
  title?: string;
  triggers_limit?: number;
  event_text?: any;
  id?: number;
};

interface IPushEventState {
  loading: boolean;
  error: string;
  total_count: number;
  push_notifications: MPushEventTemplate[];
  success: false;
}

type PushEventAction = {
  type?: string;
  payload?: any;
};

type PushEventDispatchType = (args: PushEventAction) => PushEventAction | any;

/*
Whatsapp Event Types
*/

type MWhatsappTemplate = {
  event_name?: string;
  app_name?: string;
  triggers_limit?: number;
  event_text?: any;
  id?: number;
};

interface IWhatsappState {
  loading: boolean;
  error: string;
  success: boolean;
  total_count: number;
  whatsapp_templates: MWhatsappTemplate[];
}

type WhatsappAction = {
  type?: string;
  payload?: any;
};

type WhatsappDispatchType = (args: WhatsappAction) => WhatsappAction | any;

/*
Email Event Types
*/

type MEmailTemplate = {
  updated_by?: string;
  event_id?: number;
  triggers_limit?: number;
  name?: string;
  description?: string;
  actions?: number;
  includes?: any;
  event_name?: string;
  content?: string;
  app_name?: string;
  id?: number;
  subject?: any;
};

interface MEmailPreviewState {
  content?: string;
  subject?: string;
}
interface emailIdTemplate {
  email_content_id: number;
  event_name: strng;
}

interface IEmailEventState {
  loading: boolean;
  error: string;
  total_count: number;
  email_id_templates: emailIdTemplate[];
  email_templates?: MEmailpTemplate[];
  included_templates?: MEmailTemplate[];
  email_previews?: MEmailPreviewState[];
  included_previews?: MEmailPreviewState[];
  success?: boolean;
  loadingPreview: boolean;
}

type EmailAction = {
  type?: string;
  payload?: any;
};

type EmailDispatchType = (args: EmailAction) => EmailAction | any;

interface ICurrentEventState {
  loading: boolean;
  error: string;
  current_event: null | object;
}

type CurrentAction = {
  type?: string;
  payload?: any;
};

type CurrentDispatchType = (args: CurrentAction) => CurrentAction | any;

/* Raven Interfaces */
interface IRavenRootNodeState {
  loading: boolean;
  error: string;
  editNodeDetails: any;
  createNodeSuccess: boolean;
  rootNodes: Array<any>;
  rootNodeDetails: any;
  nodeActions: Array<any>;
  newNodeOptions: Array<any>;
  inactiveNodes: Array<any>;
  ticketOptions: Array<any>;
  ravenMetaInfo: any;
  success?: boolean;
  addNodeSuccess?: boolean;
  changeActionSuccess?: boolean;
  updateRankSuccess?: boolean;
  linkedNodeDetails: Array<any>;
  toggleUpdateSuccess: boolean;
  updateSuccess: boolean;
  createSuccess: boolean;
  updatedRank: Array<any>;
  currentNodeKey: string | null;
}

type RavenRootNodeAction = {
  type?: string;
  payload?: any;
};

type RavenRootNodeDispatchType = (
  args: RavenRootNodeAction
) => RavenRootNodeAction | any;
