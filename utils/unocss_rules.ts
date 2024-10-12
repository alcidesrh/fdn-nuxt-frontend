export const utopiarules = [
    [
        /^u-(-)?([mp])([a-z]{0,1})-(\d{0,2}[a-z]{0,2})$/,
        (match: string[]) => {
            const property = getProperty(match);
            if (property && property.length) {
                const temp = match[1] == '-' ? '-' : '';
                return [
                    {
                        [property[0]]: `var(--space${temp}-${match[4]})`
                    },
                    ...(property.length > 1
                        ? [
                              {
                                  [property[1]]: `var(--space${temp}-${match[4]})`
                              }
                          ]
                        : [])
                ];
            }
            return [];
        }
    ],
    [
        /^u-(-)?([a-z]+)-(\d{1,2})$/,
        (match: string[]) => {
            let prop = match[2],
                rule: Record<string, any> = {};
            const val = `var(--step${match[1] == '-' ? '-' : ''}-${match[3]})`;

            switch (prop) {
                case 'text':
                    rule['font-size'] = val;
                    return [rule];
                default:
                    rule[prop] = val;
                    return [rule];
            }
        }
    ],
    ['text-base', { 'line-height': 'normal' }]
];

function getProperty(match: string[]): string[] | null {
    let property: string | string[] | null = match[2] == 'm' ? 'margin' : 'padding';

    if (!property) {
        return null;
    }
    if (match[3]) {
        if (match[3] == 'x' || match[3] == 'y') {
            return match[3] == 'x' ? [`${property}-left`, `${property}-right`] : [`${property}-top`, `${property}-bottom`];
        }
        const direction = [
            ['l', '-left'],
            ['t', '-top'],
            ['r', '-right'],
            ['b', '-bottom']
        ];
        for (let index = 0; index < direction.length; index++) {
            const element = direction[index];
            if (element[0] == match[3]) {
                return [property + element[1]];
            }
        }
    }
    return [property];
}
