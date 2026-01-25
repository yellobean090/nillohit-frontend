import { useEffect, useState } from "react";
import { DoerAPI } from "../services/api";

export default function Wallet() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [errMsg, setErrMsg] = useState("");

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setErrMsg("");
    setMsg("");
    setLoading(true);
    try {
      const res = await DoerAPI.wallet();
      const b = res.data?.balance ?? res.data?.wallet ?? res.data?.amount ?? 0;
      setBalance(Number(b) || 0);
    } catch {
      setErrMsg("Could not load wallet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const request = async () => {
    setMsg("");
    setErrMsg("");

    if (balance < 1) {
      setErrMsg("Minimum $1 required to withdraw.");
      return;
    }

    if (method === "upi" && !upiId.trim()) {
      setErrMsg("Enter your UPI ID.");
      return;
    }

    if (method === "usdt" && !usdtAddress.trim()) {
      setErrMsg("Enter your USDT address.");
      return;
    }

    try {
      setBusy(true);
      await DoerAPI.requestWithdrawal({
        method,
        upiId: method === "upi" ? upiId.trim() : undefined,
        usdtAddress: method === "usdt" ? usdtAddress.trim() : undefined,
      });
      setMsg("Withdrawal request submitted ✅ (Admin will review)");
      await load();
    } catch {
      setErrMsg("Withdrawal request failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <div className="headerRow">
            <div>
              <h1 className="title">Wallet</h1>
              <p className="muted">USD only. Minimum $1 for withdrawals.</p>
            </div>
            <button className="btn btnLight" onClick={load} disabled={loading}>
              Refresh
            </button>
          </div>

          {errMsg && <div className="error">{errMsg}</div>}
          {msg && <div className="success">{msg}</div>}

          <div className="walletBox">
            <div className="muted">Current Balance</div>
            <div className="balance">${loading ? "…" : balance.toFixed(2)}</div>
          </div>

          <div className="divider" />

          <h2 className="subtitle">Request Withdrawal</h2>
          <p className="muted small">
            You can withdraw twice a month with a 15-day gap (backend should
            enforce this rule).
          </p>

          <div className="row">
            <button
              className={`btn ${method === "upi" ? "" : "btnLight"}`}
              type="button"
              onClick={() => setMethod("upi")}
            >
              UPI
            </button>
            <button
              className={`btn ${method === "usdt" ? "" : "btnLight"}`}
              type="button"
              onClick={() => setMethod("usdt")}
            >
              USDT
            </button>
          </div>

          {method === "upi" ? (
            <label className="label">
              UPI ID
              <input
                className="input"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
              />
            </label>
          ) : (
            <label className="label">
              USDT Wallet Address
              <input
                className="input"
                value={usdtAddress}
                onChange={(e) => setUsdtAddress(e.target.value)}
                placeholder="0x… / TRC20…"
              />
            </label>
          )}

          <button className="btn" onClick={request} disabled={busy || loading}>
            {busy ? "Requesting…" : "Request Withdrawal"}
          </button>
        </div>
      </div>
    </div>
  );
}
