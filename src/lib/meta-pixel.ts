// Meta Pixel tracking utility

declare global {
  interface Window {
    fbq: (
      type: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}

// Test event code for Meta Pixel testing - remove in production
const TEST_EVENT_CODE = 'TEST40619';

export const trackMetaEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventParams = {
      ...params,
      test_event_code: TEST_EVENT_CODE,
    };
    window.fbq('track', eventName, eventParams);
    console.log('Meta Pixel event tracked:', eventName, eventParams);
  }
};

export const trackInitiateCheckout = (value: number, currency: string = 'EUR') => {
  trackMetaEvent('InitiateCheckout', {
    value,
    currency,
  });
};

export const trackPurchase = (value: number, currency: string = 'EUR', transactionId?: string) => {
  trackMetaEvent('Purchase', {
    value,
    currency,
    transaction_id: transactionId,
  });
};

export const trackLead = () => {
  trackMetaEvent('Lead');
};

export const trackCompleteRegistration = () => {
  trackMetaEvent('CompleteRegistration');
};
