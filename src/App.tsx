import React, { useState, useEffect, useRef } from "react";
import AppState, { initAppState } from "./state/state";
import Client from "@seithq/ncalayer";
import Layout from "./components/layout/Layout";
import StorageAlias from "./components/storage-alias/StorageAlias";
import StoragePath from "./components/storage-path/StoragePath";
import Password from "./components/password/Password";
import KeyType from "./components/key-type/KeyType";
import KeyList from "./components/key-list/KeyList";
import CMSSignatureFile from './components/cms-signature-file/CMSSignatureFile';
import './App.css';

function App() {
  // refs
  const ws = useRef<WebSocket>()

  // state
  const [ready, setReady] = useState(false)

  // input state
  const [state, setState] = useState<AppState>(initAppState())

  // setup ws
  useEffect(() => {
    ws.current = new WebSocket("wss://127.0.0.1:13579/")

    ws.current.onopen = e => {
      // tslint:disable-next-line
      console.log("connection opened")
      setReady(true)
    }

    ws.current.onclose = e => {
      if (e.wasClean) {
        // tslint:disable-next-line
        console.log("connection closed")
      } else {
        // tslint:disable-next-line
        console.log(
          "connection error: [code]=" + e.code + ", [reason]=" + e.reason
        )
      }
      setReady(false)
    }

    return () => {
      if(ws.current!.readyState === 1) {
        ws.current!.close()
      }
    }
  }, [ready])

  const client = new Client(ws.current!)

  return (
    <div className="content-app">
      <Layout ready={ready} state={state}>
        <StorageAlias client={client} state={state} setState={setState} />
        <div className="mb-4"></div>
        <StoragePath path={state.path} />
        <div className="mb-4"></div>
        <Password state={state} setState={setState} />
        <div className="mb-4"></div>
        <KeyType state={state} setState={setState} />
        <div className="mb-4"></div>
        <KeyList client={client} state={state} setState={setState} />
        <div className="mb-6"></div>
        <hr />
        <div className="mb-6"></div>
        <CMSSignatureFile client={client} state={state} setState={setState} />
      </Layout>
    </div>
  );
}

export default App;