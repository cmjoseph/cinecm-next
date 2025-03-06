'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  	const router = useRouter();
  	const searchParams = useSearchParams();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		router.replace(`?${params.toString()}`);
	}, 300);

	return (
		<input
			placeholder={placeholder}
			onChange={(e) => handleSearch(e.target.value)}
		/>
	);
}
