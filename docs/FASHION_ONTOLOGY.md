# 🌶️ SYLVIE Fashion Ontology & Styling Science Reference

The Sylvie Fashion Ontology provides a structured, computational representation of garments, body silhouettes, thermal dynamics, and color harmony.

---

## 1. Garment Classification Schema

Every piece of clothing in Sylvie is modeled with 4 distinct attribute layers:

### A. Physical Attributes
- **Fit**: `ultra_slim`, `slim`, `fitted`, `regular`, `relaxed`, `loose`, `oversized`, `boxy`, `draped`
- **Sleeve**: `sleeveless`, `cap`, `short`, `elbow`, `three_quarter`, `long`
- **Neckline**: `crew`, `v_neck`, `scoop`, `boat`, `square`, `turtleneck`, `hooded`, `mandarin`, `collar`, `polo`, `henley`
- **Rise**: `low`, `mid`, `high`, `ultra_high`
- **Silhouette**: `straight`, `tapered`, `flared`, `boxy`, `relaxed`, `fitted`, `wide_leg`, `cargo`

### B. Visual Attributes
- **Dominant Color**: Exact Hex code, English name, and normalized HSL coordinate `{ h: 0-360, s: 0-100, l: 0-100 }`
- **Temperature**: `warm` (hues 0–70° & 320–360°), `cool` (hues 140–280°), or `neutral` (saturation < 15%)
- **Pattern**: `solid`, `horizontal_stripe`, `vertical_stripe`, `plaid`, `check`, `floral`, `geometric`, `graphic`, `camo`, `tie_dye`, `polka_dot`

### C. Material & Fabric
- **Fiber**: `cotton`, `denim`, `linen`, `wool`, `silk`, `polyester`, `nylon`, `leather`
- **Fabric Construction**: `jersey`, `twill`, `corduroy`, `flannel`, `canvas`, `mesh`, `waffle`
- **Weight**: `lightweight`, `medium`, `heavy`

### D. Semantic & Layering Role
- **Formality Score**: Continuous 0.0 to 10.0 scale (0 = gym sweatpants, 10 = black tie tux)
- **Layering Role**: `base`, `mid`, `outer`, `standalone`
- **Outfit Role**: `foundation` (60%), `statement` (30%), `accent` (10%)

---

## 2. ISO 7730 Thermal CLO Reference Table

One CLO is defined as the thermal insulation required to keep a sedentary person comfortable at 21°C (70°F).

| Garment Class | Piece | Typical CLO |
|---|---|---|
| Top | Short Sleeve Crewneck Tee | 0.08 |
| Top | Long Sleeve Tee | 0.20 |
| Top | Formal Oxford Shirt | 0.25 |
| Top | Knit Merino Sweater | 0.32 |
| Bottom | Raw Denim Jeans | 0.28 |
| Bottom | Cotton Chinos | 0.24 |
| Bottom | Relaxed Shorts | 0.08 |
| Outerwear | Denim / Canvas Jacket | 0.30 |
| Outerwear | Tailored Blazer | 0.35 |
| Outerwear | Heavy Hoodie | 0.34 |
| Outerwear | Wool Overcoat | 0.55 |
| Footwear | Leather Sneakers | 0.04 |
| Footwear | Boots | 0.06 |

### Optimal Target CLO by Temperature:
- **> 35°C**: 0.30 CLO (Ultralight breathable shorts & tee)
- **28 – 35°C**: 0.50 CLO (Light tee & breathable trousers)
- **22 – 28°C**: 0.70 CLO (Standard casual layers)
- **15 – 22°C**: 1.00 CLO (Mid-weight sweater or overshirt)
- **8 – 15°C**: 1.45 CLO (Outer jacket + knitwear)
- **< 8°C**: 2.00+ CLO (Multi-layer heavy outerwear)

---

## 3. Color Harmony Engine & The 60-30-10 Rule

Sylvie evaluates color harmony by calculating circular angular differences ($\Delta \theta$) between garment hues on the color wheel:
1. **Analogous ($\Delta \theta \le 45^\circ$)**: Cohesive tonal flow without abrupt chromatic contrast.
2. **Complementary ($150^\circ \le \Delta \theta \le 210^\circ$)**: High energy statement pairing.
3. **Monochromatic ($\Delta \theta \le 25^\circ$, differing Lightness $L$)**: Runway minimalism with rich textural interplay.
4. **Neutral Accent**: 90% neutral foundation (Charcoal, Navy, Cream) with a vibrant 10% accent (Chili Red, Gold, Amber).
