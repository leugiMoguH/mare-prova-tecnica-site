import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{n as r,t as i}from"./kernelBlurVaryingDeclaration-BSyvy3eO.js";var a,o,s;function c(){return(c=e((()=>{t(),a=`kernelBlurVertex`,o=`vertexOutputs.sampleCoord{X}=vertexOutputs.sampleCenter+uniforms.delta*KERNEL_OFFSET{X};`,n.IncludesShadersStoreWGSL[a]||(n.IncludesShadersStoreWGSL[a]=o),s={name:a,shader:o}})))()}var l,u,d,f;function p(){return(p=e((()=>{t(),i(),c(),l=`kernelBlurVertexShader`,u=`attribute position: vec2f;uniform delta: vec2f;varying sampleCenter: vec2f;
#include<kernelBlurVaryingDeclaration>[0..varyingCount]
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {const madd: vec2f= vec2f(0.5,0.5);
#define CUSTOM_VERTEX_MAIN_BEGIN
vertexOutputs.sampleCenter=(vertexInputs.position*madd+madd);
#include<kernelBlurVertex>[0..varyingCount]
vertexOutputs.position= vec4f(vertexInputs.position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`,n.ShadersStoreWGSL[l]||(n.ShadersStoreWGSL[l]=u),d=[r,s];for(let e of d)n.IncludesShadersStoreWGSL[e.name]||(n.IncludesShadersStoreWGSL[e.name]=e.shader);f={name:l,shader:u}})))()}p();export{f as kernelBlurVertexShaderWGSL};