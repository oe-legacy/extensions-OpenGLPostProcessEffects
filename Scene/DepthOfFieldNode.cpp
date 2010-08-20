// Depth of field node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#include <Scene/DepthOfFieldNode.h>

#include <Resources/ResourceManager.h>
#include <Resources/IShaderResource.h>

using namespace OpenEngine::Resources;

namespace OpenEngine {
    namespace Scene {
 
        DepthOfFieldNode::DepthOfFieldNode(Math::Vector<2, int> dims, int halfSamples, float offset) 
            : ChainPostProcessNode(), halfSamples(halfSamples), offset(offset) {
            IShaderResourcePtr vert = ResourceManager<IShaderResource>::Create("extensions/OpenGLPostProcessEffects/shaders/VerticalDepthOfField.glsl");
            verticalDof = new PostProcessNode(vert, dims, 1, true);
            IShaderResourcePtr hori = ResourceManager<IShaderResource>::Create("extensions/OpenGLPostProcessEffects/shaders/HorizontalDepthOfField.glsl");
            horizontalDof = new PostProcessNode(hori, dims, 1, true);
            
            verticalDof->AddNode(horizontalDof);

            nodes.clear();
            nodes.push_back(verticalDof);
            nodes.push_back(horizontalDof);

            leaf = horizontalDof;
        }
        
        void DepthOfFieldNode::Handle(Renderers::RenderingEventArg arg){
            verticalDof->Handle(arg);
            horizontalDof->Handle(arg);

            verticalDof->GetEffect()->SetUniform("halfSamples", halfSamples);
            verticalDof->GetEffect()->SetUniform("offset", offset);

            horizontalDof->GetEffect()->SetUniform("halfSamples", halfSamples);
            horizontalDof->GetEffect()->SetUniform("offset", offset);
        }

    }
}
