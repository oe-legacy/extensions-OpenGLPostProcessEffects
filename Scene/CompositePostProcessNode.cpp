// Composite post process node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#include <Scene/CompositePostProcessNode.h>

#include <Logging/Logger.h>

using namespace OpenEngine::Math;
using namespace OpenEngine::Renderers;
using namespace OpenEngine::Resources;

using std::list;

namespace OpenEngine {
    namespace Scene {
        
        CompositePostProcessNode::CompositePostProcessNode()
            : PostProcessNode() {
        }
        
        CompositePostProcessNode::CompositePostProcessNode(list<IShaderResourcePtr> effects, 
                                                           Math::Vector<2, int> dims, 
                                                           unsigned int colorBuffers,
                                                           bool useDepth){
            nodes.clear();
            
            PostProcessNode* prevNode = NULL;
            
            list<IShaderResourcePtr>::iterator itr = effects.begin();
            while (itr != effects.end()) {
                PostProcessNode* node = new PostProcessNode(*itr, dims, colorBuffers, useDepth);
                if (prevNode) prevNode->AddNode(node);
                nodes.push_back(node);
                prevNode = node;

                ++itr;
            }

            leaf = prevNode;
        }

        CompositePostProcessNode::CompositePostProcessNode(list<PostProcessNode*> ns){
            nodes.clear();

            PostProcessNode* prevNode = NULL;
            
            list<PostProcessNode*>::iterator itr = ns.begin();
            while (itr != ns.end()) {
                PostProcessNode* node = *itr;
                if (prevNode) prevNode->AddNode(node);
                nodes.push_back(node);
                prevNode = node;
                ++itr;
            }

            leaf = prevNode;
        }

        void CompositePostProcessNode::Handle(RenderingEventArg arg){
            list<PostProcessNode*>::iterator itr = nodes.begin();
            while (itr != nodes.end()) {
                (*itr)->Handle(arg);
                ++itr;
            }
        }

        PostProcessNode* CompositePostProcessNode::GetPostProcessNode(unsigned int i){
            list<PostProcessNode*>::iterator itr = nodes.begin();
            while (itr != nodes.end() && i > 0) {
                --i;
                ++itr;
            }
            
            if (i == 0) 
                return *itr;
            else 
                return NULL;
        }

        void CompositePostProcessNode::AddNode(ISceneNode* sub){
            leaf->AddNode(sub);
        }
        
        /**
         * Visit all sub nodes of the scene node.
         *
         * @param visitor Node visitor
         */
        void CompositePostProcessNode::VisitSubNodes(ISceneNodeVisitor& visitor) {
            PostProcessNode* root = *(nodes.begin());
            root->Accept(visitor);
        }

    }
}
