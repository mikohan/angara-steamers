export interface MetaUser {
  email?: string;
  phone: string;
  firstName: string;
  clientIpAddress: string;
  clientUserAgent: string;
  fbc?: string;
  fbp?: string;
}

export interface MetaEvent {
  eventName: string;
  eventId: string;
  actionSource: "website" | "app" | "email" | "physical_store";
  user: MetaUser;
  value?: number;
  currency?: string;
  contentName?: string;
}

export interface MetaEventParams extends Omit<MetaEvent, "actionSource"> {
  actionSource?: "website" | "app" | "email" | "physical_store";
}

export interface MetaPayloadEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  action_source: string;
  user_data: {
    ph: string;
    fn: string;
    client_ip_address: string;
    client_user_agent: string;
    em?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: {
    value: number;
    currency: string;
    content_name?: string;
  };
}

export interface MetaPayload {
  data: MetaPayloadEvent[];
  test_event_code?: string;
}
