import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{i as r,n as i,r as a,t as o}from"./clipPlaneFragment-Dc7MhVQM.js";import{n as s,t as c}from"./logDepthDeclaration-v6qm295C.js";import{n as l,t as u}from"./logDepthFragment-CzBVOZVf.js";var d,f,p,m;function h(){return(h=e((()=>{t(),r(),c(),i(),u(),d=`outlinePixelShader`,f=`uniform color: vec4f;
#ifdef ALPHATEST
varying vUV: vec2f;var diffuseSamplerSampler: sampler;var diffuseSampler: texture_2d<f32>;
#endif
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (textureSample(diffuseSampler,diffuseSamplerSampler,fragmentInputs.vUV).a<0.4) {discard;}
#endif
#include<logDepthFragment>
fragmentOutputs.color=uniforms.color;
#define CUSTOM_FRAGMENT_MAIN_END
}`,n.ShadersStoreWGSL[d]||(n.ShadersStoreWGSL[d]=f),p=[a,s,o,l];for(let e of p)n.IncludesShadersStoreWGSL[e.name]||(n.IncludesShadersStoreWGSL[e.name]=e.shader);m={name:d,shader:f}})))()}h();export{m as outlinePixelShaderWGSL};