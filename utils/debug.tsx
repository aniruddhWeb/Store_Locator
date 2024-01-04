import React, { useCallback, useEffect, useState } from 'react';
import { isDEV } from '../config/Constants';
import { hasWindow } from './window';

const dialogStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 0 0 0',
  fontFamily: 'sans-serif',
  fontSize: 13,
  textAlign: 'center',
  background: '#feb',
  color: '#000',
};

const messageStyle = {
  margin: 0,
  padding: '0 8px 8px 8px',
  fontSize: '1em',
  lineHeight: 18 / 13,
};

const buttonGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 0 8px 0',
};

const buttonStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  margin: '0 3px',
  border: '1px solid black',
  borderRadius: 3,
  padding: '3px 10px',
  fontSize: 11,
  fontFamily: 'inherit',
  fontStyle: 'normal',
  lineHeight: 1,
  letterSpacing: 0,
  textDecoration: 'none',
  background: '#000',
  color: '#fff',
};

function useHarUrl(har: any) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (har && typeof URL !== 'undefined' && URL.createObjectURL) {
      const blob = new Blob([JSON.stringify(har)], {
        type: 'data:application/json;charset=utf-8',
      });
      const objectUrl = URL.createObjectURL(blob);
      setDownloadUrl(objectUrl);
    }
  }, [har]);

  return downloadUrl;
}

export function ServerHttpArchive({ har }: any) {
  const hasHarEntries = har != null && har.log.entries.length > 0;
  const [hidden, setHidden] = useState(false);
  const downloadUrl = useHarUrl(har);

  const hide = useCallback(() => {
    setHidden(true);
  }, []);

  if (!hasHarEntries || !downloadUrl || hidden) {
    return null;
  }
  return (
    <div style={dialogStyle as any}>
      <p style={messageStyle}>
        Server-side requests were recorded in an HTTP Archive.
      </p>
      <div role="group" style={buttonGroupStyle}>
        <a href={downloadUrl} download="next-fetch-ssr.har" style={buttonStyle}>
          Download
        </a>
        <button type="button" onClick={hide} style={buttonStyle}>
          Hide
        </button>
      </div>
    </div>
  );
}

export const withSSRDebug = (AppOrPage: any, props?: any) => {
  if (!isDEV) {
    return AppOrPage;
  }
  const fetch = props?.fetch || global.fetch;
  const enabled = props?.enabled || isDEV;
  const name = AppOrPage.displayName || AppOrPage.name || 'AppOrPage';

  class WithFetchHar extends React.Component<any> {
    // eslint-disable-next-line react/static-property-placement
    static displayName = `withSSRDebug(${name})`;

    static async getInitialProps(appContext: any) {
      const isApp = !!appContext.Component;
      const ctx = isApp ? appContext.ctx : appContext;
      let har = null;
      const skip = typeof enabled === 'function' ? !enabled(ctx) : !enabled;
      if (hasWindow || skip) {
        ctx.fetch = fetch;
      } else {
        // eslint-disable-next-line global-require
        const { withHar, createHarLog } = require('node-fetch-har');
        har = createHarLog();
        ctx.fetch = withHar(fetch, { har });
      }
      let initialProps = {};
      if (AppOrPage.getInitialProps) {
        initialProps = await AppOrPage.getInitialProps(appContext);
      }
      return { ...initialProps, har };
    }

    render() {
      const { har, ...restProps } = this.props;
      return (
        <>
          <AppOrPage {...restProps} />
          <ServerHttpArchive har={har} />
        </>
      );
    }
  }
  return WithFetchHar;
};
