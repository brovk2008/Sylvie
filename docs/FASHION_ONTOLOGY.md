# 🌶️ SYLVIE: Computational Fashion Ontology & Wardrobe Graph Architecture

> **Research Contribution**: A hierarchical, uncertainty-aware computational fashion ontology converting raw visual garment properties into contextual semantics, environmental equilibrium, and personalized graph recommendations.

---

## 1. The 37-Dimension Master Taxonomy

Unlike naive chatbot wrappers that classify clothing as flat strings (`type = "t-shirt"`), Sylvie models each piece of apparel across **37 orthogonal dimensions**:

| No. | Dimension | Description | Observability Tier |
|---|---|---|---|
| **01** | **Garment Identity** | Class: `top`, `bottom`, `one_piece`, `outerwear`, `footwear`, `accessory`, `traditional_ethnic`, `activewear`, `sleepwear` | Level A (Direct) |
| **02** | **Category & Subtype** | Hierarchical: Category → Subcategory → Specific garment (e.g. `Upperwear` → `Casual Top` → `Oversized Boxy Tee`) | Level A (Direct) |
| **03** | **Structural Features** | Collar, neckline, sleeve, cuff, placket, seams, darts, pleats, hem, waistband, belt loops, lining | Level A (Direct) |
| **04** | **Fit** | `ultra_slim`, `slim`, `fitted`, `regular`, `relaxed`, `loose`, `oversized`, `boxy`, `tailored`, `athletic`, `draped`, `bodycon`, `a_line` | Level B (Inferable) |
| **05** | **Dimensions & Length** | Torso: `cropped`, `waist_length`, `hip_length`, `knee_length`, `floor_length`. Sleeve: `sleeveless`, `cap`, `short`, `elbow`, `3/4`, `long` | Level A (Direct) |
| **06** | **Neckline / Collar** | `crew`, `v_neck`, `scoop`, `boat`, `square`, `sweetheart`, `halter`, `hooded`, `turtleneck`, `mock_neck`, `mandarin`, `collar`, `polo`, `notched_lapel` | Level A (Direct) |
| **07** | **Closure** | `buttons`, `zipper`, `snaps`, `hooks`, `velcro`, `drawstring`, `tie`, `wrap`, `pullover`, `open_front`, `half_zip`, `full_zip` | Level A (Direct) |
| **08** | **Closure Mechanism Details** | Double-breasted, hidden placket, reverse coil zip, magnetic | Level A (Direct) |
| **09** | **Pockets** | Patch, welt, seam, cargo, kangaroo, flap, coin | Level A (Direct) |
| **10** | **Hem** | Straight, curved/scoop, raw/distressed, stepped, ribbed, cuffed | Level A (Direct) |
| **11** | **Waist / Rise** | `low`, `mid`, `high`, `ultra_high` | Level A (Direct) |
| **12** | **Fabric & Fiber** | `cotton`, `linen`, `wool`, `silk`, `cashmere`, `hemp`, `bamboo`, `viscose`, `modal`, `polyester`, `nylon`, `leather`, `suede` | Level B (Inferable) |
| **13** | **Fabric Construction** | `denim`, `jersey`, `corduroy`, `flannel`, `fleece`, `velvet`, `satin`, `chiffon`, `tweed`, `canvas`, `knit`, `rib_knit`, `waffle`, `oxford`, `poplin` | Level B (Inferable) |
| **14** | **Material Properties** | Thickness, weight (GSM), stretch (`none`, `low`, `med`, `high`), breathability, insulation, water resistance, wind resistance, opacity, drape | Level B (Inferable) |
| **15** | **Color Representation** | Dominant, secondary, and accent colors in normalized HSL coordinates `(H: 0-360°, S: 0-100%, L: 0-100%)` & Color Temperature | Level A (Direct) |
| **16** | **Color Distribution (60-30-10)** | Dominant area %, Secondary area %, Accent area %, `solid`, `bicolor`, `multicolor`, `gradient`, `color_blocked`, `monochromatic` | Level A (Direct) |
| **17** | **Pattern** | `solid`, `horizontal_stripe`, `vertical_stripe`, `plaid`, `check`, `gingham`, `tartan`, `houndstooth`, `polka_dot`, `floral`, `paisley`, `camo`, `tie_dye`, `graphic` | Level A (Direct) |
| **18** | **Pattern Characteristics** | Scale (`micro`, `small`, `medium`, `large`), density (`low`, `med`, `high`), contrast (`low`, `med`, `high`), symmetry, direction | Level B (Inferable) |
| **19** | **Surface Texture** | `smooth`, `ribbed`, `knit`, `woven`, `rough`, `fuzzy`, `crinkled`, `pleated`, `quilted`, `embossed`, `metallic`, `leather_like`, `waffle` | Level B (Inferable) |
| **20** | **Finish** | `matte`, `gloss`, `satin`, `washed`, `distressed`, `faded`, `raw`, `coated`, `waxed`, `brushed`, `stonewashed`, `acid_washed` | Level B (Inferable) |
| **21** | **Graphics & Embellishments** | Minimal embroidery, screenprint, appliqué, chenille patch, tonal logo, typography, distressed tear | Level A (Direct) |
| **22** | **Formality Score** | Continuous 0.0 to 10.0 scale (0.0 = Beachwear, 2.0 = Casual, 4.0 = Smart Casual, 6.0 = Business Casual, 8.0 = Formal, 10.0 = Black Tie) | Level B (Inferable) |
| **23** | **Aesthetic Probabilities** | Probabilistic vector over styles: Streetwear (0.85), Minimalist (0.60), Old Money (0.20), Techwear (0.15) | Level C (Context) |
| **24** | **Occasions** | `College`, `Office`, `First Date 💕`, `Night Out / Party 🌙`, `Hackathon ⚡`, `Wedding`, `Airport / Travel`, `Weekend Casual` | Level C (Context) |
| **25** | **Season Suitability** | `spring`, `summer`, `monsoon`, `autumn`, `winter`, `all_season` (and Indian specific: `hot_dry`, `hot_humid`, `monsoon`, `mild`, `cool`, `cold`) | Level C (Context) |
| **26** | **Thermal CLO Value** | ISO 7730 calibrated thermal resistance index (0.04 to 0.70 per piece; target total 0.30 to 2.00) | Level B (Inferable) |
| **27** | **Layering Hierarchy Role** | `base` (against skin), `mid` (insulating knit/hoodie), `outer` (shell/jacket), `standalone`, `layerable`, `non_layerable` | Level C (Context) |
| **28** | **Outfit Semantic Role** | `foundation` (60% canvas), `statement` (30% focal contrast), `accent` (10% pop), `neutralizer`, `transition` | Level C (Context) |
| **29** | **Body & Proportion Effect** | `vertical_emphasis`, `horizontal_emphasis`, `shoulder_emphasis`, `waist_emphasis`, `leg_lengthening`, `torso_lengthening`, `oversized_volume` | Level B (Inferable) |
| **30** | **Cultural & Regional Style** | Western, Indian Ethnic (Handloom Kurta, Nehru Jacket, Bandhgala, Saree, Dhoti, Sherwani), East Asian (Kimono, Hanbok), Middle Eastern | Level C (Context) |
| **31** | **Cultural Formality** | Everyday traditional, festive casual, wedding ceremonial, regional formal | Level C (Context) |
| **32** | **Color Psychology & Perception** | Calibrated affective probabilities: `calm`, `energetic`, `authoritative`, `playful`, `serious`, `luxurious`, `youthful`, `mature` | Level C (Context) |
| **33** | **Combinability & Node Degree** | Wardrobe graph degree centrality measuring how many existing pieces this item harmonizes with | Level C (Context) |
| **34** | **User Preferences & Sentiments** | `liked`, `disliked`, `favorite`, `never_wear`, `user_rating`, `user_custom_tags` | Level D (User) |
| **35** | **Wardrobe Physical State** | `clean`, `dirty`, `needs_washing`, `drying`, `ironed`, `wrinkled`, `damaged`, `repair_needed`, `missing`, `stored`, `available` | Level D (User) |
| **36** | **Wear History & Economics** | Purchase price, date added, wear count, last worn timestamp, days since worn, calculated **Cost-Per-Wear (CPW)** | Level D (User) |
| **37** | **AI Confidence & Provenance** | Per-attribute confidence scores with provenance tracking and failure prevention tiering | System Meta |

---

## 2. Observability Hierarchy & Failure Prevention

To eliminate silent AI hallucinations and maintain scientific defensibility, every attribute is classified into an **Observability Level**:

```
                       📸 USER PHOTO
                             │
                             ▼
                    INSTANCE SEGMENTATION
                      YOLOv8 / SAM
                             │
                             ▼
                   ┌───────────────────┐
                   │ GARMENT DETECTION │
                   └───────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
          LEVEL A        LEVEL B        LEVEL C / D
          Direct        Inferable        Context & User
       (Color, Class) (Fit, Material)  (Occasion, Rating)
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    CANONICAL ONTOLOGY
                             │
                   ┌─────────┴─────────┐
                   ▼                   ▼
              POSTGRESQL           VECTOR DB
             (Attributes)         (Embeddings)
```

### Action Tiers by Confidence Threshold:
- **Confidence $\ge 0.90$ (Auto-Accept)**: Direct ingestion into the wardrobe graph without interrupting the user.
- **Confidence $0.60 \le c < 0.90$ (User Confirmation Required)**: The UI displays an interactive `"Is this correct?"` review card with one-tap modifier chips (e.g. `Oversized ▼` $\rightarrow$ `Regular`, `Cotton ▼` $\rightarrow$ `Polyester`).
- **Confidence $< 0.60$ (Explicit Prompt)**: The system prompts the user to identify the attribute directly, preventing corrupt graph edges.

---

## 3. Wardrobe Graph Recommendation Synergy Formula

When a user asks **"WHAT DO I WEAR?"** or inputs **"I'M GOING HERE"**, Sylvie executes multi-objective graph optimization over all valid `(Top, Bottom, Footwear, [Outerwear])` tuples:

$$\text{Total Synergy Score} = (S_{\text{compat}} \times 0.30) + (S_{\text{weather}} \times 0.25) + (S_{\text{occasion}} \times 0.20) + (S_{\text{pref}} \times 0.15) + (S_{\text{rotation}} \times 0.10)$$

Where:
1. **$S_{\text{compat}}$ (Color & Silhouette Compatibility)**:
   - Evaluates angular hue distance $\Delta \theta$ in HSL space for Analogous ($\le 45^\circ$), Complementary ($150^\circ - 210^\circ$), or Monochromatic harmonies.
   - Enforces the **60-30-10 rule** (60% base canvas, 30% focal structure, 10% accent).
   - Penalizes silhouette volume clashes (e.g. oversized boxy top + skinny tapered bottom without grounding footwear).
2. **$S_{\text{weather}}$ (ISO 7730 CLO Thermal Equilibrium)**:
   - Compares total outfit insulation against the target CLO derived from ambient temperature, feels-like temperature, humidity, and wind speed:
     $$S_{\text{weather}} = \max(50.0, 100.0 - (|\text{CLO}_{\text{total}} - \text{CLO}_{\text{target}}| \times 75.0))$$
3. **$S_{\text{occasion}}$ (Formality & Dress Code Alignment)**:
   - Matches average outfit formality (0.0 to 10.0 continuous scale) against the context preset target formality (e.g. College Presentation = 7.0, Hackathon = 2.5, First Date = 5.5).
4. **$S_{\text{pref}}$ (User Preference)**:
   - Weights favorite garments, preferred aesthetics, and skin tone undertone harmony.
5. **$S_{\text{rotation}}$ (Wardrobe Rotation & Anti-Fatigue)**:
   - Boosts garments with high `days_since_worn` ($>14$ days) to prevent wardrobe stagnation and maximize Cost-Per-Wear ROI.

---

## 4. Laundry State & Physical Availability Filtering

Before scoring combinations, the engine applies hard constraint filtering:
- Pieces with `clean_status == 'dirty'`, `'needs_washing'`, or `'drying'` are **strictly excluded**.
- This guarantees the system will never recommend a great outfit whose key piece is sitting in the laundry basket.

---

## 5. Indian Climate & Cultural Adaptation

Sylvie integrates custom climate rules tailored for South Asian weather patterns:
- **Hot & Dry (32–45°C)**: Target 0.30 CLO, prioritizing open-weave cottons, linen, and khadi.
- **Hot & Humid (28–38°C)**: Target 0.40 CLO, prioritizing high-breathability seersucker and muslin.
- **Monsoon (24–32°C)**: Target 0.55 CLO, prioritizing quick-drying synthetic blends and water-resistant finishes.
- **Mild (18–26°C)**: Target 0.70 CLO, standard denim twills and poplins.
- **Cool (12–18°C)**: Target 1.10 CLO, corduroy and light wool blends.
- **Cold (3–12°C)**: Target 1.60 CLO, layered cashmere, heavy knits, and down outerwear.

Native recognition for Indian ethnic garments (Short Kurta, Long Kurta, Nehru Jacket, Bandhgala, Saree, Lehenga, Dhoti) ensures seamless cultural formality modeling.
