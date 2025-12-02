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

export const trackMetaEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
    console.log('Meta Pixel event tracked:', eventName, params);
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
