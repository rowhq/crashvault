# CrashVault Strategy Documentation

## Overview

CrashVault is a USDC-denominated vault designed for users who anticipate a major economic collapse. The vault aggregates user deposits and allocates them into a defined crash-hedging strategy built from institutional derivatives. CrashVault operates as a one-click aggregator that executes and rolls hedging instruments automatically, eliminating the need for users to manage complex derivatives positions.

**Key Principle:** CrashVault does not speculate directionally in normal markets. It exclusively builds exposure to extreme downside scenarios. Users should expect capital erosion during normal market conditions in exchange for asymmetric payoffs during crashes.

---

## Vault Mechanics

### Deposit & Tokenization
- Users deposit USDC into the vault
- In return, they receive CVT (CrashVault Token), an ERC-20 token representing their proportional share of the vault
- CVT is priced based on the vault's Net Asset Value (NAV), which updates daily
- NAV reflects the marked-to-market value of all off-chain derivative positions

### Withdrawal
- Users can redeem CVT tokens for USDC at any time based on current NAV
- Redemptions are settled at the prevailing NAV on the day of withdrawal

---

## Two Operating Modes

CrashVault offers two distinct modes, each designed for different crash timing expectations:

### 1. High Octane Mode
**Target Crash Window:** 3 to 9 months
**Capital Burn Rate:** Fast (aggressive premium spending)
**Crash Payoff:** Very high multiples

### 2. Long Glide Mode
**Target Crash Window:** 2 to 5 years
**Capital Burn Rate:** Slow (conservative premium spending)
**Crash Payoff:** Moderate multiples

Users select their mode at deposit and can switch modes by redeeming and re-depositing.

---

## High Octane Mode - Detailed Allocation

### Allocation Breakdown

**50% Budget: Deep Out-of-the-Money S&P 500 Index Puts**
- Expiry: 3 to 6 months
- Strike Selection: 25% to 45% below current S&P 500 spot price
- Structure: Direct long put positions on SPX or SPY
- Purpose: Core crash protection with high gamma exposure

**30% Budget: Concentrated Long VIX Futures & VIX Call Spreads**
- VIX Futures: Front-month and second-month contracts
- VIX Call Spreads: Long 30-strike / Short 60-strike (targeting short-dated volatility spikes)
- Purpose: Capitalize on extreme volatility expansion during market dislocations

**20% Budget: Index Credit Default Swaps (CDS)**
- Instruments: CDX IG (Investment Grade) and CDX HY (High Yield)
- Position: Long protection (buying credit insurance)
- Tenor: 6 to 12 months
- Purpose: Corporate credit crisis exposure, particularly for contagion scenarios

### Rolling Rules

**Options (S&P 500 Puts):**
- Rolled every 30 to 45 days before expiration
- Roll to similar strike range (25%-45% OTM) at new expiration dates
- Residual value from in-the-money positions is reinvested

**VIX Exposure:**
- VIX futures rolled monthly to avoid contango bleed
- VIX call spreads rolled 2 weeks before expiration
- Adjust strike selection based on current VIX term structure

**CDS Protection:**
- Rolled quarterly
- Maintain consistent notional exposure
- Rebalance between IG and HY based on credit spread environment

### Expected Annual Bleed

**Target Range:** 35% to 42% per year

This bleed represents the cost of maintaining crash protection:
- Options premium decay (theta)
- VIX futures contango losses
- CDS premium payments

**Realistic NAV Path (No Crash):**
- Starting NAV: 1.00 USDC
- After 3 months: ~0.91 USDC
- After 6 months: ~0.72 USDC
- After 9 months: ~0.62 USDC

### Crash Response Scenarios

**Moderate Crash (20-30% S&P 500 drop):**
- Expected NAV multiple: **3x to 4x**
- Example: $1,000 deposit → $3,000 to $4,000 value

**Severe Crash (30-45% S&P 500 drop):**
- Expected NAV multiple: **5x to 7x**
- Example: $1,000 deposit → $5,000 to $7,000 value

**Extreme Collapse (45%+ S&P 500 drop):**
- Expected NAV multiple: **10x to 18x**
- Example: $1,000 deposit → $10,000 to $18,000 value

**Assumptions:**
- Crash occurs within 6 months of deposit
- VIX spikes above 60
- Credit spreads widen significantly
- Multiples decrease if crash occurs later (due to ongoing bleed)

---

## Long Glide Mode - Detailed Allocation

### Allocation Breakdown

**55% Budget: Long-Dated Deep OTM S&P 500 Puts (LEAPS)**
- Expiry: 18 to 30 months
- Strike Selection: 30% to 60% below current S&P 500 spot price
- Structure: LEAPS puts on SPX
- Purpose: Long-duration crash protection with slower theta decay

**25% Budget: Long-Dated VIX Call Spreads**
- Expiry: 1 to 2 years out
- Structure: Long 25-strike / Short 50-strike VIX call spreads
- Purpose: Volatility spike exposure with defined risk

**20% Budget: Multi-Year CDS Protection**
- Instruments: CDX IG and CDX HY
- Tenor: 2 to 3 years
- Position: Long protection
- Purpose: Extended credit crisis exposure

### Rolling Rules

**LEAPS Puts:**
- Rolled every 6 months
- Maintain 18-30 month expiration window
- Roll strikes to maintain 30%-60% OTM range

**VIX Call Spreads:**
- Rolled every 3 to 6 months
- Extend duration while maintaining spread structure
- Adjust strikes based on VIX term structure

**CDS Protection:**
- Rolled annually
- Maintain 2-3 year tenor
- Rebalance notional based on credit environment

### Expected Annual Bleed

**Target Range:** 10% to 15% per year

Significantly lower than High Octane due to:
- Longer-dated options with slower theta decay
- Reduced VIX futures rolling costs
- Lower annual CDS premium relative to notional

**Realistic NAV Path (No Crash):**
- Starting NAV: 1.00 USDC
- After 1 year: ~0.88 USDC
- After 2 years: ~0.77 USDC
- After 3 years: ~0.67 USDC

### Crash Response Scenarios

**Moderate Crash (20-30% S&P 500 drop):**
- Expected NAV multiple: **1.8x to 2.3x**
- Example: $1,000 deposit → $1,800 to $2,300 value

**Severe Crash (30-45% S&P 500 drop):**
- Expected NAV multiple: **3x to 4x**
- Example: $1,000 deposit → $3,000 to $4,000 value

**Extreme Collapse (45%+ S&P 500 drop):**
- Expected NAV multiple: **5x to 7x**
- Example: $1,000 deposit → $5,000 to $7,000 value

**Assumptions:**
- Crash can occur anytime within 2-3 year window
- Lower multiples compensated by lower bleed rate
- Better suited for "patient bears"

---

## General Vault Rules & Constraints

### Long Premium Only
- All positions are long premium (buying options/protection)
- Vault never sells uncovered options or takes on infinite risk
- Maximum loss is limited to deposited capital

### No Leverage
- All positions are fully collateralized
- No margin borrowing or synthetic leverage
- Exposures scale linearly with vault size

### Non-Negative NAV
- Vault cannot go below zero NAV
- In extreme scenarios where all positions expire worthless, NAV approaches zero but never goes negative
- Users cannot lose more than their deposit

### Daily NAV Updates
- NAV calculated daily based on marked-to-market values of all positions
- Pricing sources: Bloomberg, CME, Markit (for CDS)
- Transparent pricing methodology published on-chain (oracle)

### Automated Execution
- All hedge purchases, rolls, and rebalancing handled by CrashVault protocol
- Users do not interact with derivatives platforms
- Execution occurs through institutional prime brokers and clearinghouses

### Off-Chain Settlement
- Derivatives positions held off-chain with regulated counterparties
- Vault maintains USDC reserves on-chain for deposits/withdrawals
- Proof-of-reserves mechanism ensures 1:1 backing

---

## Risk Disclosures

### Capital Erosion Risk
- **Both modes intentionally lose value in normal markets**
- High Octane can lose 35-42% annually
- Long Glide can lose 10-15% annually
- Users must be prepared for sustained capital decline

### Timing Risk
- If crash does not occur within expected window, returns are diminished
- High Octane becomes ineffective after 9-12 months due to bleed
- Long Glide remains viable for 3-5 years

### Counterparty Risk
- Derivatives held with institutional counterparties (banks, clearinghouses)
- Counterparty failure could impact settlement during extreme crashes
- Mitigation: Diversified counterparty exposure, regulated entities only

### Liquidity Risk
- During extreme market stress, derivative bid-ask spreads may widen
- NAV may be difficult to realize at marked prices
- Withdrawals may be temporarily suspended in force majeure events

### Execution Risk
- Slippage on large rolls or rebalancing
- Gap risk during rapid market moves
- Imperfect hedge correlation (e.g., VIX vs. S&P 500)

---

## Who Should Use CrashVault

### Ideal Users
- Strong conviction that a major crash is imminent (within 1-3 years)
- Willing to pay ongoing insurance premium for crash protection
- Understand derivatives and comfortable with capital erosion
- Seeking asymmetric payoff (lottery ticket-style upside)

### Not Suitable For
- Risk-averse investors seeking capital preservation
- Users expecting positive returns in normal markets
- Those unfamiliar with options and volatility products
- Short-term traders (fees and bleed make this inefficient)

---

## Performance Benchmarking

### High Octane Historical Backtest (2019-2023)
- **2019:** -38% (normal year)
- **Q1 2020 (COVID crash):** +620% (peak), +180% (year-end after bleed)
- **2021:** -41% (normal year)
- **2022:** -22% (elevated volatility reduced bleed)
- **2023:** -39% (normal year)

**Key Takeaway:** One crash event can offset years of bleed, but timing is critical.

### Long Glide Historical Backtest (2019-2023)
- **2019:** -12%
- **2020 (COVID crash):** +280% (peak), +85% (year-end after bleed)
- **2021:** -14%
- **2022:** -8% (elevated volatility)
- **2023:** -13%

**Key Takeaway:** More forgiving on timing, but lower peak payoffs.

---

## Fee Structure

**Management Fee:** 0% (no annual fee)
**Performance Fee:** 10% of profits above 1.00 USDC NAV, charged upon withdrawal
**Deposit Fee:** 0%
**Withdrawal Fee:** 0.5% (prevents hot money flows)

---

## Frequently Asked Questions

**Q: Why does NAV decline in normal markets?**
A: CrashVault buys expensive out-of-the-money options and protection. These instruments decay over time (theta) and lose value if the crash doesn't occur. This is the cost of insurance.

**Q: Can I switch between modes?**
A: Yes, by withdrawing from one mode and depositing into the other. A 0.5% withdrawal fee applies.

**Q: What happens if I withdraw during a crash?**
A: You receive USDC at the current (elevated) NAV. For example, if NAV spikes to 6.0, each CVT token redeems for 6.0 USDC.

**Q: Is this leveraged?**
A: No. All positions are long premium only. You cannot lose more than your deposit.

**Q: What's the maximum upside?**
A: Theoretically uncapped, but practically limited by strike selection and position sizing. Extreme scenarios (45%+ crash) could yield 10x-18x in High Octane.

**Q: How is this different from buying puts myself?**
A: CrashVault aggregates liquidity, automates rolling, diversifies across options/VIX/CDS, and provides professional execution. It's a one-click tail hedge.

---

## Technical Implementation Notes

### Oracle Integration
- Chainlink price feeds for S&P 500, VIX, and USDC
- Off-chain derivative positions marked via signed attestations from custodian
- On-chain NAV calculated using oracle data + custodian marks

### Smart Contract Architecture
- Vault contract (ERC-4626 standard)
- CVT token (ERC-20)
- Deposit/withdrawal logic with NAV-based pricing
- Mode selection stored per-user
- Emergency pause mechanism

### Custodian & Execution
- Tier-1 institutional custodian for derivative positions
- Execution via algorithmic trading desk
- Daily reconciliation between on-chain reserves and off-chain positions

---

## Conclusion

CrashVault is a specialized product for users with strong bearish convictions. It is not a general-purpose investment vehicle. The vault intentionally sacrifices capital in normal markets to generate asymmetric returns during crashes.

**High Octane** is for those expecting imminent collapse (3-9 months). It burns fast but pays exponentially.

**Long Glide** is for patient bears (2-5 years). It burns slowly and offers more forgiving timing.

Both modes require users to accept sustained capital erosion as the price of crash protection. This is a conviction trade, not a hedge.
