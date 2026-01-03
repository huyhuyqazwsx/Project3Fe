import { useState, memo } from "react";
import type { SubjectSearchParams } from "../../types/subject.ts";

interface SearchFormProps {
    onSearch: (params: SubjectSearchParams) => Promise<void>;
}

export const SubjectSearchForm = memo(({ onSearch }: SearchFormProps) => {
    const [keyword, setKeyword] = useState('');
    const [minChapters, setMinChapters] = useState<number | undefined>();
    const [maxChapters, setMaxChapters] = useState<number | undefined>();
    const [sortBy, setSortBy] = useState<'name' | 'code' | 'chapters'>('name');
    const [desc, setDesc] = useState(false);

    const handleSearch = async () => {
        await onSearch({
            keyword: keyword || undefined,
            minChapters,
            maxChapters,
            sortBy,
            desc,
        });
    };

    const handleReset = async () => {
        setKeyword('');
        setMinChapters(undefined);
        setMaxChapters(undefined);
        setSortBy('name');
        setDesc(false);
        await onSearch({});
    };

    return (
        <div style={{ marginBottom: 20, padding: 15, border: '1px solid #ddd', borderRadius: 5 }}>
            <h3>🔍 Tìm kiếm</h3>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                <input
                    placeholder="Tên hoặc mã môn học"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    style={{ flex: 1, minWidth: 200, padding: 8 }}
                />

                <input
                    type="number"
                    min={0}
                    placeholder="Số chương tối thiểu"
                    value={minChapters || ''}
                    onChange={e =>
                        setMinChapters(
                            e.target.value ? Number(e.target.value) : undefined
                        )
                    }
                    style={{ width: 150, padding: 8 }}
                />

                <input
                    type="number"
                    min={0}
                    placeholder="Số chương tối đa"
                    value={maxChapters || ''}
                    onChange={e =>
                        setMaxChapters(
                            e.target.value ? Number(e.target.value) : undefined
                        )
                    }
                    style={{ width: 150, padding: 8 }}
                />
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    Sắp xếp theo:
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as 'name' | 'code' | 'chapters')}
                        style={{ padding: 6 }}
                    >
                        <option value="name">Tên</option>
                        <option value="code">Mã</option>
                        <option value="chapters">Số chương</option>
                    </select>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={desc}
                        onChange={e => setDesc(e.target.checked)}
                    />
                    Giảm dần
                </label>

                <button
                    onClick={handleSearch}
                    style={{
                        padding: '6px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                    }}
                >
                    Tìm kiếm
                </button>

                <button
                    onClick={handleReset}
                    style={{
                        padding: '6px 20px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
});