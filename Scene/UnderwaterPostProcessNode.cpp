// Underwater post process node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#include <Scene/UnderwaterPostProcessNode.h>

using namespace OpenEngine::Math;
using namespace OpenEngine::Renderers;

namespace OpenEngine {
    namespace Scene {
        
        UnderwaterPostProcessNode::UnderwaterPostProcessNode()
            : PostProcessNode() {
        }
        
        UnderwaterPostProcessNode::UnderwaterPostProcessNode(Resources::IShaderResourcePtr effect, 
                                                             Math::Vector<2, int> dims, 
                                                             unsigned int colorBuffers,
                                                             bool useDepth)
            : PostProcessNode(effect, dims, colorBuffers, useDepth){
            
        }


        void UnderwaterPostProcessNode::Initialize(RenderingEventArg arg){

        }

        void UnderwaterPostProcessNode::PreEffect(RenderingEventArg* arg, Matrix<4,4,float>* modelview){
            float height = arg->canvas.GetViewingVolume()->GetPosition()[1];
            this->enabled = height < 0;
                
        }
        
    }
}
