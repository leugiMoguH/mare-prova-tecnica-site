import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{St as r,xt as i}from"./babylon-CwZDLHGh.js";var a,o,s,c;function l(){return(l=e((()=>{t(),r(),a=`rgbdDecodePixelShader`,o=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);}`,n.ShadersStore[a]||(n.ShadersStore[a]=o),s=[i];for(let e of s)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);c={name:a,shader:o}})))()}l();export{c as rgbdDecodePixelShader};