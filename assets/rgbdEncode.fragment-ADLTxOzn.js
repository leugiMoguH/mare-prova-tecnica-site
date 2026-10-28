import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{St as r,xt as i}from"./babylon-j47pSUdg.js";var a,o,s,c;function l(){return(l=e((()=>{t(),r(),a=`rgbdEncodePixelShader`,o=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);}`,n.ShadersStore[a]||(n.ShadersStore[a]=o),s=[i];for(let e of s)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);c={name:a,shader:o}})))()}l();export{c as rgbdEncodePixelShader};