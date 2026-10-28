import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";var r,i,a;function o(){return(o=e((()=>{t(),r=`shadowMapFragmentSoftTransparentShadow`,i=`#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM.x*alpha) discard;
#endif
`,n.IncludesShadersStore[r]||(n.IncludesShadersStore[r]=i),a={name:r,shader:i}})))()}o();export{a as shadowMapFragmentSoftTransparentShadow};