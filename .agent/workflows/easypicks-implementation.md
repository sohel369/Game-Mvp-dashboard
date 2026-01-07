---
description: EasyPicks MVP Implementation Plan
---

# EasyPicks MVP Implementation Plan

## Phase 1: Core Infrastructure ✅
- [x] Web3Provider with WalletConnect (Base chain)
- [x] Premium UI foundation with glassmorphism
- [x] Navbar with wallet connection
- [ ] Database schema (Prisma)
- [ ] API routes for core functionality

## Phase 2: User Flow & Betting System
1. **Cart System**
   - Create cart context for managing multiple ticket selections
   - Cart UI component (drawer/modal)
   - Add to cart functionality with pick validation

2. **Play/Betting Page** (`/play/week-52`)
   - Display 6 matches with inline score inputs
   - Ticket quantity selector (1-1000)
   - Add to Cart button
   - Cart summary with total cost

3. **Deposit System**
   - QR code generation for Base USDC deposits
   - Webhook listener (Alchemy) for deposit detection
   - Internal balance crediting

4. **Withdrawal System**
   - Request withdrawal form (min $10)
   - Admin approval workflow
   - Transaction hash tracking

## Phase 3: Scoring & Prize Distribution
1. **Scoring Engine**
   - Exact score: 10 points
   - Correct winner: 5 points
   - Correct winner + goal difference: 7 points
   - Configurable point values

2. **Vault & Prize System**
   - 10% rake calculation
   - 90% prize pool distribution
   - Tier-based allocation (60pts, 45-59, 30-44, 20-29)
   - Rollover logic for unclaimed tiers
   - Auto-credit to internal balance

## Phase 4: Transparency Pages
1. **All Bets** (`/transparency/bets`)
   - Public view of all tickets
   - Masked wallet addresses
   - Detailed picks display
   - Scores and prizes

2. **Prize Credits** (`/transparency/prizes`)
   - Prize crediting history
   - Tier breakdown
   - Vault/Round info

3. **Withdrawals** (`/transparency/withdrawals`)
   - Withdrawal history
   - Transaction hashes (Basescan links)
   - Masked addresses

## Phase 5: Dashboard & Referrals
1. **Player Dashboard** (`/dashboard`)
   - Current balance
   - Active tickets
   - Past tickets history
   - Performance charts
   - Withdrawal section
   - Referral code & stats

2. **Referral System**
   - Unique code generation
   - Referral link tracking
   - Qualifying bet validation ($10 min)
   - Bonus crediting ($5 + $5)
   - Monthly cap (40 referrals)

## Phase 6: Admin Panel
1. **Admin Authentication**
   - Password-protected access
   - Session management

2. **Admin Features**
   - Vault management
   - Round & match creation
   - Results entry
   - Scoring rules configuration
   - Prize settings
   - Withdrawal approvals
   - User & referral oversight

## Phase 7: Testing & Launch
1. End-to-end testing
2. Smart contract integration (if needed)
3. Production deployment
4. Monitoring & analytics

## Current Priority
Starting with Phase 2: Building the cart system and play page to enable the core betting flow.
