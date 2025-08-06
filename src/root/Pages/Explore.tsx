import { useEffect, useState } from "react";
import GridPostList from "@/components/shared/GridPostList";
import { Loader } from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
	useGetPost,
	useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useInView } from "react-intersection-observer";

const Explore = () => {
	const { ref, inView } = useInView();
	const { data: posts, fetchNextPage, hasNextPage } = useGetPost();
	const [searchValue, setSearchValue] = useState("");
	const debouncedValue = useDebounce(searchValue, 500);
	const { data: searchedPosts, isFetching: isFetchingPosts } =
		useSearchPosts(debouncedValue);

	useEffect(() => {
		if (inView && !searchValue) {
			fetchNextPage();
		}
	}, [inView, searchValue, fetchNextPage]);
	if (!posts) {
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);
	}
	const showSearchResults = searchValue !== "";
	const showPosts = !showSearchResults && posts?.pages?.length > 0;
	console.log(searchedPosts);
	return (
		<div className="explore-container">
			<div className="explore-inner_container">
				<h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
				<div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
					<img
						src="/assets/icons/search.svg"
						alt="search"
						width={24}
						height={24}
					/>
					<Input
						type="search"
						placeholder="Search"
						className="explore-search"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex-between w-full max-w-5xl mt-16 mb-7">
				<h3 className="body-bold md:h3-bold">Popular Today</h3>
				<div className="flex-center gap-3 rounded-xl bg-dark-3 px-4 py-2 cursor-pointer">
					<p className="small-medium md:base-medium text-light-2">All</p>
					<img
						src="/assets/icons/filter.svg"
						width={20}
						height={20}
						alt="filter"
					/>
				</div>
			</div>
			<div className="flex flex-wrap gap-9 w-full max-w-5xl">
				{showSearchResults ? (
					<SearchResults
						isSearchFetching={isFetchingPosts}
						searchedPosts={searchedPosts}
					/>
				) : !showPosts ? (
					<p className="text-light-4 w-full mt-10 text-center">End of posts</p>
				) : (
					posts.pages.map((item, index) => (
						<li key={index}>
							<GridPostList key={`page-${index}`} posts={item.documents} />
						</li>
					))
				)}
			</div>
			{hasNextPage && !searchValue && (
				<div ref={ref} className="mt-10">
					<Loader />
				</div>
			)}
		</div>
	);
};

export default Explore;
