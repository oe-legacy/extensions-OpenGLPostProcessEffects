// Depth of field node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#ifndef _DEPTH_OF_FIELD_NODE_H_
#define _DEPTH_OF_FIELD_NODE_H_

#include <Scene/ChainPostProcessNode.h>

namespace OpenEngine {
    namespace Scene {
        
        class DepthOfFieldNode : public ChainPostProcessNode {
            int halfSamples;
            float offset;
            
            PostProcessNode* verticalDof;
            PostProcessNode* horizontalDof;

        public:
            DepthOfFieldNode(Math::Vector<2, int> dims, int halfSamples = 9, float offset = 0.015);
            
            void Handle(Renderers::RenderingEventArg arg);

        };
    }
}

#endif
