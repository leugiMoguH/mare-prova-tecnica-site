import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{n as r,t as i}from"./helperFunctions-CXgl4J9v.js";var a,o,s,c;function l(){return(l=e((()=>{t(),r(),a=`rgbdDecodePixelShader`,o=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=vec4f(fromRGBD(textureSample(textureSampler,textureSamplerSampler,input.vUV)),1.0);}`,n.ShadersStoreWGSL[a]||(n.ShadersStoreWGSL[a]=o),s=[i];for(let e of s)n.IncludesShadersStoreWGSL[e.name]||(n.IncludesShadersStoreWGSL[e.name]=e.shader);c={name:a,shader:o}})))()}l();export{c as rgbdDecodePixelShaderWGSL};