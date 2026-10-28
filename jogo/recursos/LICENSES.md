# Recursos e licenças — arte/

| Recurso | Origem | Licença |
|---|---|---|
| Esqueleto humanoide e animações `Idle_Loop`, `Dance_Loop` (dentro de `modelos/kira.glb`) | Quaternius, *Universal Animation Library* (Standard), https://quaternius.itch.io/universal-animation-library | CC0 1.0 (License.txt no pacote) |
| *Universal Base Characters* (descarregado, **não usado** nos modelos) | Quaternius, https://quaternius.itch.io/universal-base-characters | CC0 1.0 |
| Malha, roupa, cabelo e rosto da Kira; coreografia `Groove_Loop` | Originais, gerados por `blender/kira.py` e `blender/danca.py` | Projeto MARÉ |
| Cenário da vinheta e texturas (calçada, tijolo, azulejo, cal, madeira) | Originais, `blender/vinheta.py` + `blender/texturas.py` (numpy) | Projeto MARÉ |
| Personagem de teste da prova 3D (`comparacao/prova3d/modelos/proxy-crianca.glb`, malha reduzida e re-rigada por `rig3d.py`; **não é a Kira**) | Grab3D, biblioteca High Detail | CC0 |
| Kira 2D (texturas de `comparacao/prova2d/tex/`) | Originais, mestra gerada via Codex + `camadas.py` | Projeto MARÉ |
| three.js 0.186.1 (inclui GLTFLoader e utilitários) | https://github.com/mrdoob/three.js | MIT |
| Blender 4.5.15 LTS (ferramenta, não distribuída) | https://www.blender.org | GPL (o conteúdo produzido é nosso) |
| Playwright (ferramenta) | Microsoft | Apache-2.0 |

Os pacotes CC0 ficam em `fontes/` (fora do git, 326 MB); recriar com `node scripts/itch.mjs <url> fontes`.
Os `.blend` são intermédios e regeneram-se com os scripts (fora do git).
