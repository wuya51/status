import { c as create_ssr_component, e as escape, a as subscribe, v as validate_component, b as each, i as is_promise, n as noop, d as add_attribute } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import "moment";
const uikit_min = "";
const getPoFErrors = (addr) => {
  return {
    function: "0x1::proof_of_fee::audit_qualification",
    type_arguments: [],
    arguments: [addr]
  };
};
const validator_grade_payload = (address) => ({
  function: "0x1::grade::get_validator_grade",
  type_arguments: [],
  arguments: [address]
});
const all_vouchers_payload = (address) => ({
  function: "0x1::vouch::all_vouchers",
  type_arguments: [],
  arguments: [address]
});
const vouchers_in_val_set_payload = (address) => ({
  function: "0x1::vouch::true_friends",
  type_arguments: [],
  arguments: [address]
});
const account_balance_payload = (address) => ({
  function: "0x1::ol_account::balance",
  type_arguments: [],
  arguments: [address]
});
const apiUrl = writable();
const apiUrlNote = writable();
const systemInfo = writable();
const pofInfo = writable();
const valDataStore = writable();
const selectedAccount = writable({ address: "" });
const govStore = writable();
const fetchUserAccounts = async (accounts) => {
  if (accounts.length == 0)
    throw "no accounts";
  const accountsData = [];
  for (const a of accounts) {
    const requests = [
      postViewFunc(all_vouchers_payload(a)),
      postViewFunc(vouchers_in_val_set_payload(a)),
      postViewFunc(account_balance_payload(a))
    ];
    const [buddies_res, buddies_in_set_res, bal_res] = await Promise.all(requests);
    const u = {
      address: a,
      active_vouchers: buddies_in_set_res[0],
      all_vouchers: buddies_res[0],
      balance: {
        unlocked: bal_res[0],
        total: bal_res[1]
      }
    };
    accountsData.push(u);
  }
  return accountsData;
};
let api;
const postViewFunc = async (payload) => {
  return await api.post("/view", payload).then((r) => {
    return r.data;
  }).catch((e) => {
    console.error(`Failed to get view ${payload}, message: ${e.message}`);
    throw e;
  });
};
const scaleCoin = (unscaled) => {
  return unscaled / 1e6;
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { style = "default" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `<div class="${"uk-card uk-card-" + escape(style, true) + " uk-card-body uk-margin-left uk-margin-bottom"}"><h5 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">${escape(title)}</h5> ${slots.body ? slots.body({}) : ``}</div>`;
});
const SystemInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $systemInfo, $$unsubscribe_systemInfo;
  $$unsubscribe_systemInfo = subscribe(systemInfo, (value) => $systemInfo = value);
  $$unsubscribe_systemInfo();
  return `${validate_component(Card, "Card").$$render(
    $$result,
    {
      title: "System Information",
      style: "primary"
    },
    {},
    {
      body: () => {
        return `<div slot="body">${$systemInfo ? `<ul><li>Chain ID: ${escape($systemInfo.chain_id)}</li> <li>Epoch: ${escape($systemInfo.epoch)}</li> <li>Ledger Version: ${escape($systemInfo.ledger_version)}</li> <li>Oldest Ledger Version: ${escape($systemInfo.oldest_ledger_version)}</li> <li>Fees: ${escape($systemInfo.fees)}</li></ul> <ul> <li>Ledger Timestamp: ${escape($systemInfo.ledger_timestamp)}</li> <li>Node Role: ${escape($systemInfo.node_role)}</li> <li>Oldest Block Height: ${escape($systemInfo.oldest_block_height)}</li> <li>Block Height: ${escape($systemInfo.block_height)}</li> <li>Git Hash: ${escape($systemInfo.git_hash)}</li> <li>Epoch Duration: ${escape($systemInfo.epoch_duration)}</li></ul> <ul><li>VDF Difficulty: ${escape($systemInfo.vdf[0])}</li> <li>VDF Security: ${escape($systemInfo.vdf[1])}</li> <li>Infra Escrow: ${escape(scaleCoin($systemInfo.infra_escrow))}</li></ul> <ul><li>Val Seats: ${escape($systemInfo.validator_seats)}</li></ul>` : `<span data-svelte-h="svelte-omrbt4">Loading...</span>`}</div>`;
      }
    }
  )}`;
});
const AccountTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { profiles = [] } = $$props;
  if ($$props.profiles === void 0 && $$bindings.profiles && profiles !== void 0)
    $$bindings.profiles(profiles);
  return `<main> <table class="uk-table uk-table-responsive uk-table-divider"><thead data-svelte-h="svelte-jmoe9y"><tr><th>Address</th> <th>All Vouchers</th> <th>Active Vouchers</th> <th>Balance</th> <th>Grade</th></tr></thead> <tbody>${profiles.length > 0 ? `${each(profiles, (a) => {
    return `<tr><td><button class="uk-button uk-button-link">${escape(a.address.slice(0, 5))} </button></td> <td>${escape(a.all_vouchers && a.all_vouchers.length || "no buddies")}</td> <td>${escape(a.active_vouchers && a.active_vouchers.length || "no buddies")}</td> <td>${escape(a.balance && `${scaleCoin(a.balance.unlocked)} / ${scaleCoin(a.balance.total)}` || "no balance found")}</td> <td>${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
                ...
              `;
      }
      return function(res) {
        return ` ${escape(res[0])} : ${escape(res[1])}/${escape(res[2])} `;
      }(__value);
    }(postViewFunc(validator_grade_payload(a.address)))}</td> </tr>`;
  })}` : ``}</tbody></table></main>`;
});
const ValidatorSet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $valDataStore, $$unsubscribe_valDataStore;
  $$unsubscribe_valDataStore = subscribe(valDataStore, (value) => $valDataStore = value);
  $$unsubscribe_valDataStore();
  return `<main>${$valDataStore && $valDataStore.current_profiles ? `<h5>Validator Set (${escape($valDataStore && $valDataStore.current_profiles && $valDataStore.current_profiles.length || 0)}):</h5> ${validate_component(AccountTable, "AccountTable").$$render($$result, { profiles: $valDataStore.current_profiles }, {}, {})}` : ``}</main>`;
});
const Validators = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(Card, "Card").$$render($$result, { title: "Validators", style: "primary" }, {}, {
    body: () => {
      return `<div slot="body">${validate_component(ValidatorSet, "ValidatorSet").$$render($$result, {}, {}, {})}</div>`;
    }
  })}</main>`;
});
const AccountView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedAccount, $$unsubscribe_selectedAccount;
  $$unsubscribe_selectedAccount = subscribe(selectedAccount, (value) => $selectedAccount = value);
  $$unsubscribe_selectedAccount();
  return `<main>${$selectedAccount ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
  ...
  `;
    }
    return function(profiles) {
      return ` ${validate_component(Card, "Card").$$render(
        $$result,
        {
          title: "User: " + $selectedAccount.address.slice(0, 5),
          style: "primary"
        },
        {},
        {
          body: () => {
            return `<div slot="body"><button class="uk-button uk-button-default" data-svelte-h="svelte-28a6pq"><span>close</span></button> ${validate_component(AccountTable, "AccountTable").$$render($$result, { profiles }, {}, {})}</div>`;
          }
        }
      )} `;
    }(__value);
  }(fetchUserAccounts([$selectedAccount.address]))}` : ``}</main>`;
});
const BoundaryStatus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $systemInfo, $$unsubscribe_systemInfo;
  $$unsubscribe_systemInfo = subscribe(systemInfo, (value) => $systemInfo = value);
  $$unsubscribe_systemInfo();
  return `${validate_component(Card, "Card").$$render(
    $$result,
    {
      title: "Boundary Status",
      style: "default"
    },
    {},
    {
      body: () => {
        return `<div slot="body">${$systemInfo && $systemInfo.boundary_status ? `
      Musical Chairs:
      <li>incoming_compliant:
        ${each($systemInfo.boundary_status["incoming_compliant"], (e) => {
          return `${escape(e.slice(0, 5))} |${escape("	")}`;
        })}</li> <li>incoming_compliant_count: ${escape($systemInfo.boundary_status["incoming_compliant_count"])}</li> <li>incoming_seats_offered: ${escape($systemInfo.boundary_status["incoming_seats_offered"])}</li>


      Proof-of-Fee:
      <li>incoming_all_bidders:
        ${each($systemInfo.boundary_status["incoming_all_bidders"], (e) => {
          return `${escape(e.slice(0, 5))} |${escape("	")}`;
        })}</li> <li>incoming_only_qualified_bidders:
        ${each($systemInfo.boundary_status["incoming_only_qualified_bidders"], (e) => {
          return `${escape(e.slice(0, 5))} |${escape("	")}`;
        })}</li> <li>incoming_auction_winners:
        ${each($systemInfo.boundary_status["incoming_auction_winners"], (e) => {
          return `${escape(e.slice(0, 5))} |${escape("	")}`;
        })}</li> <li>incoming_filled_seats: ${escape($systemInfo.boundary_status["incoming_filled_seats"])}</li> <li>incoming_fees: ${escape($systemInfo.boundary_status["incoming_fees"])}</li> <li>incoming_fees_success: ${escape($systemInfo.boundary_status["incoming_fees_success"])}</li>

      Reconfiguration:
      <li>incoming_post_failover_check:
        ${each($systemInfo.boundary_status["incoming_post_failover_check"], (e) => {
          return `${escape(e.slice(0, 5))} |${escape("	")}`;
        })}</li> <li>incoming_missing_configs
        ${each($systemInfo.boundary_status["incoming_vals_missing_configs"], (e) => {
          return `${escape(e.slice(0, 5))} |${escape("	")}`;
        })}</li> <li>incoming_actual_vals:
        ${each($systemInfo.boundary_status["incoming_actual_vals"], (e) => {
          return `${escape(e.slice(0, 5))} |${escape("	")}`;
        })}</li> <li>incoming_final_set_size: ${escape($systemInfo.boundary_status["incoming_final_set_size"])}</li> <li>incoming_reconfig_success: ${escape($systemInfo.boundary_status["incoming_reconfig_success"])}</li>` : ``}</div>`;
      }
    }
  )}`;
});
var PoFError = /* @__PURE__ */ ((PoFError2) => {
  PoFError2[PoFError2["VALIDATOR_NOT_CONFIGURED"] = 11] = "VALIDATOR_NOT_CONFIGURED";
  PoFError2[PoFError2["WALLET_NOT_SLOW"] = 12] = "WALLET_NOT_SLOW";
  PoFError2[PoFError2["IS_JAILED"] = 13] = "IS_JAILED";
  PoFError2[PoFError2["TOO_FEW_VOUCHES"] = 14] = "TOO_FEW_VOUCHES";
  PoFError2[PoFError2["BID_IS_ZERO"] = 15] = "BID_IS_ZERO";
  PoFError2[PoFError2["BID_EXPIRED"] = 16] = "BID_EXPIRED";
  PoFError2[PoFError2["LOW_UNLOCKED_COIN_BALANCE"] = 17] = "LOW_UNLOCKED_COIN_BALANCE";
  return PoFError2;
})(PoFError || {});
const mapPoFErrors = (list) => {
  return list.map((e) => {
    return PoFError[parseInt(e)];
  });
};
const ValidatorUniverse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $pofInfo, $$unsubscribe_pofInfo;
  $$unsubscribe_pofInfo = subscribe(pofInfo, (value) => $pofInfo = value);
  var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  const getErrors = (addr) => __awaiter(void 0, void 0, void 0, function* () {
    return postViewFunc(getPoFErrors(addr)).then((res) => {
      return mapPoFErrors(res[0]);
    });
  });
  $$unsubscribe_pofInfo();
  return `<main>${validate_component(Card, "Card").$$render(
    $$result,
    {
      title: "Validator Universe",
      style: "default"
    },
    {},
    {
      body: () => {
        return `<div slot="body"> <table class="uk-table uk-table-responsive uk-table-divider"><thead data-svelte-h="svelte-wiezrt"><tr><th>Address</th> <th>Bid</th> <th>Qualified</th> <th>Errors</th></tr></thead> <tbody>${$pofInfo && $pofInfo.bidders.length > 0 ? `${each($pofInfo.bidders, (addr, idx) => {
          return `<tr><td><button class="uk-button uk-button-link">${escape(addr.slice(0, 5))} </button></td> <td>${escape($pofInfo.bids[idx])}</td> <td>${escape($pofInfo.qualified.includes(addr))}</td> <td>${function(__value) {
            if (is_promise(__value)) {
              __value.then(null, noop);
              return `
                    ...
                  `;
            }
            return function(errs) {
              return ` ${escape(errs)} `;
            }(__value);
          }(getErrors(addr))}</td> </tr>`;
        })}` : ``}</tbody></table></div>`;
      }
    }
  )}</main>`;
});
const GovEvents = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $govStore, $$unsubscribe_govStore;
  $$unsubscribe_govStore = subscribe(govStore, (value) => $govStore = value);
  let highest_proposal;
  let can_resolve;
  govStore.subscribe((all) => {
    if (all) {
      highest_proposal = all.map((e) => {
        return +e.data.proposal_id;
      }).reduce(
        (p, e) => {
          return Math.max(p, e);
        },
        0
      );
      postViewFunc({
        function: "0x1::diem_governance::get_can_resolve",
        arguments: [highest_proposal.toString()],
        type_arguments: []
      }).then((r) => {
        can_resolve = r[0];
      });
    }
  });
  $$unsubscribe_govStore();
  return `<main>${$govStore && $govStore.length > 0 ? `${validate_component(Card, "Card").$$render($$result, { title: "Upgrade Votes", style: "default" }, {}, {
    body: () => {
      return `<div slot="body"><h4 class="uk-text-muted">PASSING: ${escape(can_resolve)}</h4> <table class="uk-table uk-table-responsive uk-table-divider"><thead data-svelte-h="svelte-jm3f27"><tr><th>Address</th> <th>Proposal</th> <th>For/Against</th></tr></thead> <tbody>${each($govStore, (a) => {
        return `${a.data.proposal_id == highest_proposal ? `<tr><td>${escape(a.data.voter.slice(0, 5))}</td> <td>${escape(a.data.proposal_id)}</td> <td>${escape(a.data.should_pass)}</td> </tr>` : ``}`;
      })}</tbody></table></div>`;
    }
  })}` : ``}</main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $apiUrl, $$unsubscribe_apiUrl;
  let $apiUrlNote, $$unsubscribe_apiUrlNote;
  let $selectedAccount, $$unsubscribe_selectedAccount;
  $$unsubscribe_apiUrl = subscribe(apiUrl, (value) => $apiUrl = value);
  $$unsubscribe_apiUrlNote = subscribe(apiUrlNote, (value) => $apiUrlNote = value);
  $$unsubscribe_selectedAccount = subscribe(selectedAccount, (value) => $selectedAccount = value);
  $$unsubscribe_apiUrl();
  $$unsubscribe_apiUrlNote();
  $$unsubscribe_selectedAccount();
  return `<main class="uk-container uk-text-small"><h1 data-svelte-h="svelte-8cljlu">status</h1> <div class="uk-grid uk-row"><div class="uk-column-1-3"><button class="uk-button uk-button-default" data-svelte-h="svelte-1ffplzb">refresh</button></div>  <div class="uk-margin uk-column-1-3">${$apiUrl ? `<input class="uk-input" type="text"${add_attribute("placeholder", $apiUrl, 0)} aria-label="Input"${add_attribute("value", $apiUrl, 0)}> <button class="uk-button uk-button-default" data-svelte-h="svelte-1kdol71">update url</button>
        note: ${escape($apiUrlNote)}` : ``}</div></div> <div><div class="uk-flex uk-flex-wrap">${$selectedAccount && $selectedAccount.address ? `${validate_component(AccountView, "AccountView").$$render($$result, {}, {}, {})}` : `${validate_component(SystemInfo, "SystemInfo").$$render($$result, {}, {}, {})} ${validate_component(BoundaryStatus, "BoundaryStatus").$$render($$result, {}, {}, {})} ${validate_component(Validators, "Validators").$$render($$result, {}, {}, {})} ${validate_component(ValidatorUniverse, "ValidatorUniverse").$$render($$result, {}, {}, {})} ${validate_component(GovEvents, "GovEvents").$$render($$result, {}, {}, {})}`}</div></div></main>`;
});
export {
  Page as default
};
