import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Tezos } from '@taquito/taquito';
import { ThanosWallet } from '@thanos-wallet/dapp';

const check = async () => {
  try {
    const available = await ThanosWallet.isAvailable();
    if (!available) {
      throw new Error('Thanos Wallet not installed');
    }
  } catch (err) {
    console.log(err);
  }
}

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{ backgroundColor: '#18222f' }}>
        <div class="container">
          
          <Link class="navbar-brand" to="/">
            Tijori
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/DAO">
                  DAO
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Rules" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Rules">
                  Rules
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/wallet" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Create">
                  Create
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);