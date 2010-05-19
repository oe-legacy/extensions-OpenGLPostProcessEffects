// Blur post process node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#include <Scene/BlurPostProcessNode.h>

namespace OpenEngine {
    namespace Scene {
        
        BlurPostProcessNode::BlurPostProcessNode()
            : PostProcessNode() {
        }
        
        void BlurPostProcessNode::Initialize(RenderingEventArg arg){

        }

        void BlurPostProcessNode::PreEffect(IRenderer& renderer, Matrix<4,4,float> modelview){

        }
        
    }
}
