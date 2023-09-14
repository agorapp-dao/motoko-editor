import TreeView, { flattenTree } from 'react-accessible-treeview';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import * as S from './Tree.styled';
import { useEditorStore } from '../EditorStore';
import { useMemo } from 'react';

type TTreeMetadata = {
  tabIndex: number;
};

export const Tree = () => {
  const store = useEditorStore();
  const data = useMemo(() => {
    const folder = {
      name: '',
      children: store.tabs.map((tab, index) => {
        return { name: tab.path, metadata: { tabIndex: index } };
      }),
    };
    return flattenTree<TTreeMetadata>(folder);
  }, [store.tabs]);

  const index = useMemo(() => {
    return data.findIndex(tab => tab.metadata?.tabIndex === store.activeTab);
  }, [data, store.activeTab]);

  return (
    <S.Directory>
      <TreeView
        data={data}
        aria-label="directory tree"
        selectedIds={[index]}
        onNodeSelect={props => {
          if (props.element.metadata?.tabIndex !== undefined) {
            store.actions.setActiveTab(props.element.metadata.tabIndex as number);
          }
        }}
        nodeRenderer={({ element, isBranch, isExpanded, getNodeProps, level }) => (
          <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
            {isBranch ? <Folder isOpen={isExpanded} /> : <FileIcon filename={element.name} />}
            {element.name}
          </div>
        )}
      />
    </S.Directory>
  );
};

type TFolderProps = {
  isOpen: boolean;
};

const Folder = ({ isOpen }: TFolderProps) => (isOpen ? <FolderOpenIcon /> : <FolderIcon />);

type TFileIconProps = {
  filename: string;
};

const FileIcon = ({ filename }: TFileIconProps): null => {
  const extension = filename.slice(filename.lastIndexOf('.') + 1);
  switch (extension) {
    // case 'js':
    //   return <DiJavascript color="yellow" className="icon" />;
    // case 'css':
    //   return <DiCss3 color="turquoise" className="icon" />;
    // case 'json':
    //   return <FaList color="yellow" className="icon" />;
    // case 'npmignore':
    //   return <DiNpm color="red" className="icon" />;
    default:
      return null;
  }
};
