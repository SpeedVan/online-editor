

const tmp = {    
    DemoTreeData: [
        { title: '.gitignore' },
        { title: 'package.json' },
        {
            title: 'src',
            isDirectory: true,
            expanded: true,
            children: [
                { title: 'styles.css' },
                { title: 'index.js' },
                { title: 'reducers.js' },
                { title: 'actions.js' },
                { title: 'utils.js' },
            ],
        },
        {
            title: 'tmp',
            isDirectory: true,
            children: [
                { title: '12214124-log' },
                { title: 'drag-disabled-file', dragDisabled: true },
            ],
        },
        {
            title: 'build',
            isDirectory: true,
            children: [{ title: 'react-sortable-tree.js' }],
        },
        {
            title: 'public',
            isDirectory: true,
        },
        {
            title: 'node_modules',
            isDirectory: true,
        },
    ]
}

export default tmp