import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{at as r,ct as i,dt as a,ft as o,mt as s,ot as c,pt as l,st as u}from"./babylon-C2MG_MRF.js";var d,f,p,m;function h(){return(h=e((()=>{t(),s(),a(),i(),r(),d=`outlinePixelShader`,f=`#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
uniform vec4 color;
#ifdef ALPHATEST
varying vec2 vUV;uniform sampler2D diffuseSampler;
#endif
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (texture2D(diffuseSampler,vUV).a<0.4)
discard;
#endif
#include<logDepthFragment>
gl_FragColor=color;
#define CUSTOM_FRAGMENT_MAIN_END
}`,n.ShadersStore[d]||(n.ShadersStore[d]=f),p=[l,o,u,c];for(let e of p)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);m={name:d,shader:f}})))()}h();export{m as outlinePixelShader};