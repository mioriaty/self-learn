export interface PostMessageOptions {
  is: 'parent' | 'children';
  url?: string;
  iframeSelector?: string;
}
type Callback<T> = (payload: T) => void;

export type EmitMessage = Record<string, any>;
export type OnMessage = Record<string, any>;

class PostMessage<EmitMessageT extends EmitMessage, OnMessageT extends OnMessage> {
  private w: Window | null | undefined;
  private readonly iframeSelector: string | undefined;
  private readonly url: string;
  private readonly is: PostMessageOptions['is'];

  constructor({ is, url = '*', iframeSelector }: PostMessageOptions) {
    this.w = null;
    this.is = is;
    this.url = url;
    this.iframeSelector = iframeSelector;
  }

  public setPopup = (url: string) => {
    if (!this.w || this.w?.closed) {
      this.w = window.open(url);
    } else {
      this.w.focus();
    }
  };

  public emit = <K extends keyof EmitMessageT>(eventType: K, payload: EmitMessageT[K]) => {
    if (!!this.iframeSelector) {
      const iframeEl: HTMLIFrameElement | null = document.querySelector(this.iframeSelector);
      this.w = iframeEl?.contentWindow;
    }
    const message = {
      type: eventType,
      payload,
    };
    if (!!this.w && this.is === 'parent') {
      this.w.postMessage(message, this.url);
    } else {
      window.opener?.postMessage(message, this.url);
      window.parent?.postMessage(message, this.url);
    }
  };

  on = <K extends keyof OnMessageT>(eventType: K, callback: Callback<OnMessageT[K]>) => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === eventType) {
        callback(event.data.payload);
      }
    };
    window.addEventListener('message', handler, false);
    return () => {
      window.removeEventListener('message', handler, false);
    };
  };
}

export function createPostMessage<EmitMessageT extends EmitMessage, OnMessageT extends OnMessage>({
  is,
  url = '*',
  iframeSelector,
}: PostMessageOptions) {
  const pm = new PostMessage<EmitMessageT, OnMessageT>({
    is,
    url,
    iframeSelector,
  });

  return pm;
}
